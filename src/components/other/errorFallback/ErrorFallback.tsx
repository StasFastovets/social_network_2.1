import { useErrorBoundary } from "react-error-boundary";
import s from './errorFallback.module.scss'


type ErrorFallbackType = {
   error: Error
}

const ErrorFallback: React.FC<ErrorFallbackType> = ({ error }) => {
   const { resetBoundary } = useErrorBoundary();  // для сброса ошибки используем hook useErrorBoundary()

   return (
      <div className={s.body} role="alert">
         <p>Something went wrong!</p>
         {/* <pre style={{ color: "red" }}>{error.message}</pre> */}
         <button onClick={resetBoundary}>Try again</button>
      </div>
   );
}

export default ErrorFallback

