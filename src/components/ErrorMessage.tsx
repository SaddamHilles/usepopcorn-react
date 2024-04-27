interface Props {
    msg: string;
}
const ErrorMessage = ({ msg }: Props) => {
  console.log('msg: ', msg);
    return (
        <div className="error">
            {' '}
            <span>⛔</span> {msg}
        </div>
    );
};

export default ErrorMessage;
