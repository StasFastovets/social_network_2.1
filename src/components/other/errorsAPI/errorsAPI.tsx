import React from 'react';
import s from './errorsAPI.module.scss'

interface ErrorsAPIProps {
   error: string;
}

const ErrorsAPI: React.FC<ErrorsAPIProps> = ({ error }) => {
   return (
      <div className={s.error}>
         {error}
      </div>
   )
}


export default ErrorsAPI