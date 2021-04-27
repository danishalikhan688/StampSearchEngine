// ChangeDoctorStatus
import { MenuClick, CampaignData } from "./types/types";
/* 
 * @Reducer switch the types to alter the state 
 */
export default (state, { type, payload }) => {
    switch (type) {
        case MenuClick:
            return {
                ...state,
                pageTitle: payload
            }
        case CampaignData:
            return {
                ...state,
                dummyCampaigns: payload
            }
            // case ChangeDoctorStatus:
            //     return{
            //         ...status,
            //         allDoctors:payload,
            //     }
        default:
            return state
    }
};