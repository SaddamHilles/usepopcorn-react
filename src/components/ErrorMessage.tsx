interface Props {
    msg: string;
}
const ErrorMessage = ({ msg }: Props) => {
    return (
        <div className="error">
            {' '}
            <span>⛔</span> {msg}
        </div>
    );
};

export default ErrorMessage;
