import { Link } from "react-router-dom";

export function ForgotPasswordWarning({buttonText, to}) {
  return <div className="text-sm flex justify-center">
    <Link className="pointer underline pl-1 cursor-pointer" to={to}>
      {buttonText}
    </Link>
  </div>
}