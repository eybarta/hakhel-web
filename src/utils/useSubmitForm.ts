import { FormikHelpers } from 'formik';

type SaveFunction<T, R> = (data: T) => Promise<R>;
type responseCallback<R> = (data: R) => void;
type callbackFunction = () => void;

interface submitFormProps<T, R> {
  saveFunction: SaveFunction<T, R>;
  formatData?: (values: any) => T;
  submit?: responseCallback<R>;
  callback?: callbackFunction;
}

const useSubmitForm = <T, R>({
  saveFunction,
  formatData,
  submit,
  callback,
}: submitFormProps<T, R>) => {
  const submitHandler = async (
    values: any,
    {
      setSubmitting,
    }: {
      setSubmitting: FormikHelpers<any>['setSubmitting'];
    }
  ) => {
    try {
      // console.log('setSubmitting: ', setSubmitting);
      const data = formatData ? formatData(values) : values;
      const response: R = await saveFunction(data);
      setSubmitting(false);
      if (submit) {
        submit(response);
      }
      if (callback) {
        callback();
      }
    } catch (error) {
      console.error('error: ', error);
      setSubmitting(false);
      // handle error
    }
  };

  return submitHandler;
};

export default useSubmitForm;
