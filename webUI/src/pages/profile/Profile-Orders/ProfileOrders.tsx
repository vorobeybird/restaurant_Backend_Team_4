import {Redirect} from "react-router-dom";
import {useSelector} from "react-redux";
import {AppStateType} from "../../../store";
import {AuthStateType} from "../../../store/auth/auth.reducer";

function ProfileOrders() {
    const user = useSelector<AppStateType, AuthStateType>(state => state.auth.user);

    if (user === null) {
        return <Redirect to="/login"/>
    }
    return <div>
        <h1>Orders of current user</h1>
    </div>
}

export default ProfileOrders;