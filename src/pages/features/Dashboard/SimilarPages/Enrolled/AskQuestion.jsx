import { BellRing } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { FaQuestion } from "react-icons/fa"

function AskQuestion() {
    return (
        <Card className='w-1/2 imd:w-full imd:max-w-[30rem]'>
            <CardHeader className='pb-2'>
                <CardTitle>Ask Us</CardTitle>
                <CardDescription>Having issues with a payment not popping up?</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-2">
                <div className="flex items-center space-x-4 rounded-md border p-4">
                    <BellRing />
                    <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none xsm:text-xs">
                            Push Notifications
                        </p>
                        <p className="text-sm text-muted-foreground hrmd:text-xs">
                            Send notifications to device.
                        </p>
                    </div>
                    <Switch />
                </div>
                <ul className="list-disc ml-5">
                    <li className="text-[0.9rem] hrmd:text-[0.8rem] hrmd:leading-6 text-slate-800">
                        Payments may take additional time to process due to banking hours, holidays, or high transaction volumes.
                    </li>

                    <li className="text-[0.9rem] hrmd:text-[0.8rem] hrmd:leading-6 text-slate-800">
                        A typo in account numbers or payment details can cause the payment to be misrouted or delayed.
                    </li>

                    <li className="text-[0.9rem] hrmd:text-[0.8rem] hrmd:leading-6 text-slate-800">
                        Technical glitches or maintenance on the bank’s side may temporarily prevent the payment from showing up.
                    </li>
                </ul>
            </CardContent>
            <CardFooter className='pb-3'>
                <Button className="w-full">
                    <FaQuestion /> Ask Us
                </Button>
            </CardFooter>
        </Card>
    )
}

export default AskQuestion