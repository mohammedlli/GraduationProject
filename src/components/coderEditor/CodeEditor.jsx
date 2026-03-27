import { useEffect, useRef, useState } from "react";
import { Box, HStack, Text, Spinner } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import { FiCode, FiFileText } from "react-icons/fi";
import { useParams } from "react-router";
import { getFileByAnswerId } from "../../service/Answers";
import { useQuery } from "@tanstack/react-query";
import Output from "./Output";

const CodeEditor = () => {
  const editorRef = useRef(null);
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("javascript");
  const { id } = useParams();

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const {
    data: answerFile,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["answers", id],
    queryFn: () => getFileByAnswerId(id),
  });

  useEffect(() => {
    if (answerFile) {
      setValue(answerFile.content || "");
      setLanguage(answerFile.language || "javascript");
    }
  }, [answerFile]);

  if (isLoading) {
    return (
      <Box className="flex h-[80vh] items-center justify-center rounded-2xl bg-white shadow-md">
        <Box className="flex flex-col items-center gap-3">
          <Spinner size="lg" color="blue.400" />
          <Text className="text-gray-600 font-medium">Loading code file...</Text>
        </Box>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box className="flex h-[80vh] items-center justify-center rounded-2xl bg-red-50 shadow-md">
        <Box className="text-center">
          <Text className="text-lg font-semibold text-red-500">
            Failed to load code
          </Text>
          <Text className="mt-2 text-sm text-gray-600">
            Please try again later
          </Text>
        </Box>
      </Box>
    );
  }

  return (
    <Box className="rounded-2xl bg-white p-4 shadow-md">
      {/* Header */}
      <Box className="mb-4 flex items-center justify-between">
        <Box className="flex items-center gap-3">
          <Box className="rounded-xl bg-[#4B96FF]/10 p-2 text-[#4B96FF]">
            <FiCode size={20} />
          </Box>
          <Box>
            <Text className="text-sm text-gray-500">
              View and run submitted code
            </Text>
          </Box>
        </Box>

        <Box className="flex items-center gap-2 rounded-xl bg-gray-100 px-3 py-2 text-sm text-gray-700">
          <FiFileText className="text-[#4B96FF]" />
          <span>{language}</span>
        </Box>
      </Box>

      {/* Editor + Output */}
      <HStack spacing={4} align="start">
        <Box w="70%" className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
          <Editor
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              padding: { top: 12 },
              scrollBeyondLastLine: false,
              automaticLayout: true,
            }}
            height="75vh"
            theme="vs-dark"
            language={language}
            value={value}
            onMount={onMount}
            onChange={(val) => setValue(val || "")}
          />
        </Box>

        <Output editorRef={editorRef} language={language} />
      </HStack>
    </Box>
  );
};

export default CodeEditor;