import { type NextPage } from 'next';
import { signIn } from 'next-auth/react';

const Home: NextPage = () => {
  return (
    <div className="mt-12">
      <div className="flex flex-col text-center font-bold text-6xl">
        <h1 className="text-6xl">On the job hunt?</h1>
        <h1>Track all your job applications in one place.</h1>
      </div>
      <div className="flex flex-col align-middle items-center">
        <p className="font-medium text-2xl my-4">
          JAT is a tool to help view and manage all of your job applications.
        </p>
        <button
          onClick={() => signIn('discord', { callbackUrl: '/tracker' })}
          className="bg-orange-500 p-3 w-20 rounded-lg font-bold hover:bg-orange-600"
        >
          Sign in
        </button>
      </div>
    </div>
  );
};

export default Home;
