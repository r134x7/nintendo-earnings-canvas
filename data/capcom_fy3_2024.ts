// set up like a json file
import {
    collectionCapcomV2,
    consolidatedEarningsMapDataForAnimation,
    type EarningsJSONV2,
    type EarningsMakeV2,
} from "../../../nintendo-earnings-data-and-other-video-game-companies/webpage_v2/src/data/generalTables/consolidated_earnings_general"

import {
    type EarningsV2,
} from "../../../nintendo-earnings-data-and-other-video-game-companies/webpage_v2/src/utils/general_earnings_logic"

import {
    collectionV2,
} from "../../../nintendo-earnings-data-and-other-video-game-companies/webpage_v2/src/data/capcom/software_sales_Capcom"

import {
    salesPerSoftwareValuesForAnimation,
} from "../../../nintendo-earnings-data-and-other-video-game-companies/webpage_v2/src/utils/segment_data_logic"

export const { date, header, dataThisFY, dataLastFY, opMargin, percentagesThisFY } = consolidatedEarningsMapDataForAnimation(collectionCapcomV2.get(0) as EarningsJSONV2, collectionCapcomV2.get(1))


export const capcomSales = salesPerSoftwareValuesForAnimation(
    {
        ...collectionV2.get(0),
        data: [
            collectionV2.get(0)?.data[0],
            collectionV2.get(0)?.data[1],
        ] as EarningsMakeV2[]
    } satisfies EarningsJSONV2,
    {
        ...collectionV2.get(0),
        data: [
            collectionV2.get(1)?.data[0],
            collectionV2.get(1)?.data[1],
        ] as EarningsMakeV2[]
    } satisfies EarningsJSONV2,
    "Hundred Million",
    "One Thousand"
)