import { useState } from "react";
import { Box, Text, useToast, Spinner } from "@chakra-ui/react";
import { FiPlay, FiTerminal, FiAlertCircle } from "react-icons/fi";
import { executeCode } from "../../coderEditor/coder";

const Output = ({ editorRef, language }) => {
  const toast = useToast();
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const runCode = async () => {
    const sourceCode = editorRef.current?.getValue();

    if (!sourceCode?.trim()) {
      toast({
        title: "No code found",
        description: "Please write some code before running.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode);

      setOutput(result.output?.split("\n") || []);
      setIsError(!!result.stderr);
    } catch (error) {
      setIsError(true);
      toast({
        title: "Execution failed",
        description: error.message || "Unable to run code",
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box w="30%" minW="320px">
      <Box className="mb-4 flex items-center justify-between">
        <Text className="flex items-center gap-2 text-lg font-semibold text-gray-700">
          <FiTerminal />
          Output
        </Text>

        <button
          onClick={runCode}
          disabled={isLoading}
          className="
            flex items-center cursor-pointer gap-2 rounded-xl bg-[#4B96FF] px-4 py-2
            font-medium text-white shadow-md transition hover:opacity-90
            disabled:cursor-not-allowed disabled:opacity-70
          "
        >
          {isLoading ? <Spinner size="sm" /> : <FiPlay />}
          {isLoading ? "Running..." : "Run Code"}
        </button>
      </Box>

      <Box
        height="60vh"
        p={4}
        overflowY="auto"
        border="1px solid"
        borderRadius="16px"
        borderColor={isError ? "red.400" : "gray.200"}
        bg={isError ? "red.50" : "gray.900"}
        color={isError ? "red.500" : "gray.100"}
        boxShadow="md"
      >
        {output ? (
          <Box className="space-y-2 font-mono text-sm">
            {output.map((line, i) => (
              <Text key={i} whiteSpace="pre-wrap">
                {line || " "}
              </Text>
            ))}
          </Box>
        ) : (
          <Box className="flex h-full flex-col items-center justify-center text-center text-gray-400">
            <FiAlertCircle size={28} className="mb-3" />
            <Text fontSize="md" fontWeight="medium">
              No output yet
            </Text>
            <Text fontSize="sm">
              Click "Run Code" to see the result here
            </Text>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Output;