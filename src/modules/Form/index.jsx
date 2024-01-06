import { useState } from "react";
import Button from "../../components/Button/Button";
import Input from "../../components/Input";
import { useNavigate } from "react-router";
import { backendUrl } from "../../../.config";
const Form = ({
  // eslint-disable-next-line react/prop-types
  isSignInPage = false,
}) => {
  const [data, setData] = useState({
    ...(!isSignInPage && {
      fullName: "",
    }),
    email: "",
    password: "",
  });
  const navigate=useNavigate();
  const handleSubmit=async(e)=>{
    console.log('data', data);
    e.preventDefault();
    const res=await fetch(`${backendUrl}/${isSignInPage ?'login' : 'register'}`,{
      method:'POST',
      headers: {'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  if(res.status === 400){
alert('Invalid credentials');
  }else{
    const resData=await res.json();
    if(resData.token){
      localStorage.setItem('user:token',resData.token);
      localStorage.setItem('user:detail',JSON.stringify(resData.user));
      navigate('/')
    }
  }
  }
  return (
    <div className="bg-light h-screen flex items-center justify-center">
      <div
      className="bg-white w-[500px] h-[600px]  shadow-lg rounded-lg
     flex flex-col justify-center items-center"
    >
      <div className="text-4xl font-extrabold">
        Welcome {isSignInPage && "Back"}
      </div>
      <div className="text-xl font-light mb-14">
        {isSignInPage ? "Sign in to get explored" : " Sign up  to get started"}
      </div>
      <form action="" className="flex flex-col items-center w-full" onSubmit={(e)=>handleSubmit(e)}>
        {!isSignInPage && (
          <Input
            label="Name"
            name="fullName"
            placeholder="Enter your Full Name"
            className="mb-4 w-[50%]"
            value={data.fullName}
            onChange={(e) => setData({ ...data, fullName: e.target.value })}
          />
        )}
        <Input
          label="Email "
          name="email"
          placeholder="Enter your Email"
          className="mb-6 w-[50%]"
          type="email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="Enter your Passowrd"
          className="mb-9 w-[50%]"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <Button
          label={isSignInPage ? "Sign in" : "Sign up"}
          type="submit"
          className="w-1/2 mb-3"
        />
      </form>

      <div>
        {isSignInPage ? "Did't have an account?" : "Already have an account?"}{" "}
        <span className="text-primary cursor-pointer underline" onClick={()=>navigate(`/users/${isSignInPage? 'sign_up':'sign_in'}`)}>
          {isSignInPage ? "Sign up" : "Sign in"}
        </span>
      </div>
    </div>
    </div>
  );
};

export default Form;
