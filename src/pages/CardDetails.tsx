import transactionHistBtn from "../assets/transactionHistBtn.svg";
import forwardHistBtn from "../assets/forwardHistBtn.svg";
import HistoryList from "../components/HistoryList";

const CardDetails = ({balance}: {balance: string}) => {
return (
  <div className="flex flex-col h-full  py-2">
    <div className="flex flex-row justify-between">
      <div className="flex flex-col">
        <div className="text-sm text-white/60">Balance</div>
        <div className="text-xl text-white">{balance}</div>
      </div>
      <div className="flex flex-row">
        <button className="mr-3">
          <img src={transactionHistBtn} alt="transaction history" />
        </button>
        <button>
          <img src={forwardHistBtn} alt="forward history" />
        </button>
      </div>
    </div>
    <div className="w-full">
      <HistoryList page="card"/>
    </div>
  </div>
);
};

export default CardDetails;
