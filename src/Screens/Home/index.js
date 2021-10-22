import React from 'react'
import SideBar from '../../components/SideBar'
import Registeration from '../Registeration'
import Booking from '../Booking'
import Billing from '../Billing'
import { Route, Switch } from 'react-router'

export default function Home() {
    return (
        <>
            <div>
                <SideBar />
            </div>
            <div>
                <Switch>
                    <Route exact path="/home/Registeration" component={Registeration} />
                    <Route exact path="/home/Booking" component={Booking} />
                    <Route exact path="/home/Billing" component={Billing} />
                    <Route path="*" component={Registeration} />
                </Switch>
            </div>
        </>
    )

}