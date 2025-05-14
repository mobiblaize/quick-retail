
import AccountBalance from './AccountBalance'
import LatestExpense from './LatestExpense'
import LatestIncome from './latestIncome'

const BalanceModules = () => {
  return (
    <div className="bg-white  px-4 py-6 rounded-md">
      <div className="flex flex-col md:flex-row justify-between gap-1 w-full max-w-7xl mx-auto ">
        <AccountBalance />
        <LatestIncome />
        <LatestExpense />
      </div>
    </div>
  )
}

export default BalanceModules
