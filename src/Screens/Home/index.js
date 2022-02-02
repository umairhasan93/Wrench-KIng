import React from 'react'
import SideBar from '../../components/SideBar'
import Registeration from '../Registeration'
import Booking from '../Booking'
import Billing from '../Billing'
import { Route, Switch } from 'react-router'

export default function Home() {

    const [username, setUser] = React.useState('')

    React.useEffect(() => {
        try {
            let user = localStorage.getItem('@admin')
            if (user) {
                user = JSON.parse(user)
                setUser(user.name)
            }
        } catch (e) {

        }
    })

    return (
        <>
            <div>
                <SideBar
                    name={username}
                />
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