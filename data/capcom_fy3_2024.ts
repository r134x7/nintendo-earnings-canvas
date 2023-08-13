// set up like a json file
import {
    collectionCapcomV2,
    consolidatedEarningsMapDataForAnimation,
    type EarningsJSONV2,
} from "../../../nintendo-earnings-data-and-other-video-game-companies/webpage_v2/src/data/generalTables/consolidated_earnings_general"

export const { date, header, dataThisFY, dataLastFY, opMargin, percentagesThisFY } = consolidatedEarningsMapDataForAnimation(collectionCapcomV2.get(0) as EarningsJSONV2, collectionCapcomV2.get(1))
