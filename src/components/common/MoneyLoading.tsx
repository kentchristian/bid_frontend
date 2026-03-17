interface MoneyLoadingProps {
  loadingText?: string;
}
const MoneyLoading = ({ loadingText }: MoneyLoadingProps) => {
  return (
    <div className="money-loader-wrapper">
      <div className="coin">$</div>
      <p className="loading-text">{loadingText}</p>
    </div>
  );
};

export default MoneyLoading;
