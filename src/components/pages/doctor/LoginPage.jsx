
export default function LoginPage() {
  return (
    <div className="mt-20">
   
<div class=" mx-auto w-full max-w-md rounded-xl bg-[#EFEBE9] px-6 py-10 shadow-lg border border-[#D7CCC8]"

>
  <div class="sm:mx-auto sm:w-full sm:max-w-sm ">
   
    <h1 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-[#775b51] ">Sign in to your account</h1>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form action="#" method="POST" class="space-y-6">
      <div>
        <label for="email" class="block text-sm/6 font-medium text-[#775b51]">Email address</label>
        <div class="mt-2">
         <input
  id="email"
  type="email"
  name="email"
  required
  autocomplete="email"
  class="block w-full rounded-md bg-white px-3 py-2 text-base text-[#4b3b34] border border-[#D7CCC8] placeholder:text-[#9E9E9E] focus:outline-none focus:ring-2 focus:border-[#6D4C41]
 focus:ring-[#6D4C41] sm:text-sm"
/>

        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label for="password" class="block text-sm/6 font-medium text-[#775b51]">Password</label>
          <div class="text-sm">
            <a href="#" class="font-semibold text-[#8D6E63] hover:text-[#6D4C41] transition-colors duration-200"
>Forgot password?</a>
          </div>
        </div>
        <div class="mt-2">
          <input id="password" type="password" name="password" required autocomplete="current-password" class="block w-full rounded-md bg-white px-3 py-2 text-base text-[#4b3b34] border border-[#D7CCC8] placeholder:text-[#9E9E9E] focus:outline-none focus:ring-2 focus:border-[#6D4C41]
 focus:ring-[#6D4C41] sm:text-sm"
/>
        </div>
      </div>

      <div>
        <button type="submit" class="flex w-full justify-center rounded-md  bg-[#A1887F]  px-1 py-2 text-sm/6 font-semibold text-[#4b3b34] hover:bg-[#8D6E63] focus-visible:outline-2 focus-visible:outline-offset-2 ">Sign in</button>
      </div>
    </form>

    
  </div>
</div>

    </div>
  );
}