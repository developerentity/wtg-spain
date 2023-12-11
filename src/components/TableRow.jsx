import { useDispatch } from "react-redux"
import { addItem, changeValueOfItem, removeItem } from "../redux/slices/itemsSlice"
import Select from "./Select"

const TableRow = ({
    item,
    index,
    citiesOptions,
    typesOptions,
}) => {

    const dispatch = useDispatch()

    const inputHandle = (keyId, keyOfTheObj, value) => {
        const obj = { keyId, keyOfTheObj, value }
        dispatch(changeValueOfItem(obj))
    }

    const onCopyHandler = (item) => {
        if (item.price || item.city || item.type) {
            dispatch(addItem(item))
        }
    }

    const onDelete = (keyId) => {
        dispatch(removeItem(keyId))
    }

    return (
        <tr className="row">
            <th className="col-2" scope="row">{index + 1}</th>
            <td className="col-2">
                <input
                    className="w-100"
                    value={item.id}
                    onChange={(e) => inputHandle(
                        item.keyId,
                        "id",
                        e.currentTarget.value)} />
            </td>
            <td className="col-2">
                <input
                    className="w-100"
                    value={item.price}
                    onChange={(e) => inputHandle(
                        item.keyId,
                        "price",
                        e.currentTarget.value)} />
            </td>
            <td className="col-2">
                <Select
                    options={citiesOptions}
                    value={item.city}
                    onChange={(val) => inputHandle(item.keyId, "city", val)} />
            </td>
            <td className="col-2">
                <Select
                    options={typesOptions}
                    value={item.type}
                    onChange={(val) => inputHandle(item.keyId, "type", val)} />
            </td>
            <td className="col-2">
                <div className="d-flex justify-content-center">
                    <button
                        type="button"
                        className="btn btn-primary btn-sm mx-1"
                        onClick={() => onCopyHandler(item)}>
                        Copy
                    </button>
                    <button
                        type="button"
                        className="btn btn-primary btn-sm mx-1"
                        onClick={() => onDelete(item.keyId)}>
                        Delete
                    </button>
                </div>
            </td>
        </tr>
    )
}

export default TableRow