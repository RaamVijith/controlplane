import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import IndividualView from "./individualView/IndividualView"

const TabNavigationLeads=()=> {
  return (
    <Tabs defaultValue="individualView" className="w-full">
      <TabsList className="flex flex-row justify-between w-full bg-white px-[3%] py-6 border-b-2 rounded-none ">
        <h1 className="font-bold text-black">Leads</h1>
        <div>
        <TabsTrigger value="individualView">Individual View</TabsTrigger>
        <TabsTrigger value="companyView">Company View</TabsTrigger>
        </div>
        
      </TabsList>
      <TabsContent className="m-0 w-full h-ful" value="individualView">
        <IndividualView/>
      </TabsContent>
      <TabsContent value="companyView">
        <h1>Company</h1>
      </TabsContent>
    </Tabs>
  )
}

export default TabNavigationLeads