
import DateFilterMenu from '../../../General/filterMenu'
import { Group, } from "@mantine/core";

const Header = () => {
  return (
    <div className="flex justify-between bg-white p-[1em] rounded-t-lg">
 <div className="text-[#101828] font-medium mt-[0.5em]">Payment Overview Vendor</div>
 <div>
 <Group className="mt-2 sm:mt-0">
          <DateFilterMenu
            defaultFilter="This Month"
            buttonVariant="subtle"
            buttonSize="md"
             showIconOnly="sm"
          />
        </Group> 
 </div>
    </div>
  )
}

export default Header