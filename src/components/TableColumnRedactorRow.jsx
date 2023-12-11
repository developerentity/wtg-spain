import { useEffect, useState } from "react"
import Select from "./Select"
import { changeAllValuesOfItemsWithThisKey } from "../redux/slices/itemsSlice"
import { useDispatch } from "react-redux"


const TableColumnRedactorRow = ({
    citiesOptions,
    typesOptions
}) => {

    const dispatch = useDispatch()

    const [price, setPrice] = useState('')
    const [city, setCity] = useState('')
    const [type, setType] = useState('')

    const askPermissionToChangeAllColumn = () => {
        const message = 'Are you sure you want to edit all column values?'
        const result = window.confirm(message)
        return result
    }

    useEffect(() => {
        const permission = city && askPermissionToChangeAllColumn()
        if (permission) {
            dispatch(changeAllValuesOfItemsWithThisKey({ keyOfTheObj: 'city', value: city }))
        }
        setCity('')
    }, [dispatch, city])

    useEffect(() => {
        const permission = type && askPermissionToChangeAllColumn()
        if (permission) {
            dispatch(changeAllValuesOfItemsWithThisKey({ keyOfTheObj: 'type', value: type }))
        }
        setType('')
    }, [dispatch, type])

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            onPriceChangeHandler()
        }
    };

    const onPriceChangeHandler = () => {
        const permission = price && askPermissionToChangeAllColumn()
        if (permission) {
            dispatch(changeAllValuesOfItemsWithThisKey({ keyOfTheObj: 'price', value: price }))
        }
        setPrice('')
    }

    return (
        <tr className="row">
            <th className="col-2" scope="row">All</th>
            <td className="col-2"></td>
            <td className="col-2">
                <input
                    className="w-100"
                    value={price}
                    onChange={(e) => setPrice(e.currentTarget.value)}
                    onBlur={onPriceChangeHandler}
                    onKeyDown={handleKeyPress} />
            </td>
            <td className="col-2">
                <Select
                    options={citiesOptions}
                    placeholder="Select to all"
                    value={city}
                    onChange={(val) => setCity(val)} />
            </td>
            <td className="col-2">
                <Select
                    options={typesOptions}
                    placeholder="Select to all"
                    value={type}
                    onChange={(val) => setType(val)} />
            </td>
            <td className="col-2"></td>
        </tr>
    )
}

export default TableColumnRedactorRow
