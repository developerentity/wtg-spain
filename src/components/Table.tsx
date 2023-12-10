import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { ItemType, addItem, clearList } from "../redux/slices/itemsSlice";
import { getCitiesOptions, getTypesOptions } from "../redux/slices/selectSlice";
import TableColumnRedactorRow from "./TableColumnRedactorRow";
import TableRow from "./TableRow";

const Table = () => {

    const dispatch = useAppDispatch()
    const items = useAppSelector(state => state.itemsSlice.items)
    const { citiesOptions, typesOptions } = useAppSelector(state => state.selectSlice)

    const onAddNewItemHandle = () => {
        dispatch(addItem(null))
    }

    const validateDataBeforeSend = (arr: Array<ItemType>): boolean => {
        if (!Array.isArray(arr)) {
            window.alert('No data to send')
            return false
        }

        const idSet = new Set<string>();

        for (const obj of arr) {
            if (!obj.id) {
                window.alert('No ID field in one or more objects')
                return false
            }

            if (idSet.has(obj.id)) {
                window.alert(`Duplicate id detected: ${obj.id}`)
                return false
            }

            idSet.add(obj.id);
        }

        return true;
    }

    const onSave = () => {
        const permission = validateDataBeforeSend(items)
        if (permission) {
            // dispatch(postData(items))
            window.alert('Data was sent')
            dispatch(clearList())
        }
    }

    useEffect(() => {
        citiesOptions.length === 0 && dispatch(getCitiesOptions())
        typesOptions.length === 0 && dispatch(getTypesOptions())
    }, [dispatch, citiesOptions, typesOptions])

    return (
        <div className="container">
            <div className="d-flex align-items-center justify-content-center vh-100 flex-column">
                <div className="d-flex py-3">
                    <h4>Property table</h4>
                    <button
                        type="button"
                        className="btn btn-primary btn-sm ms-3"
                        onClick={onAddNewItemHandle}>
                        Add row
                    </button>
                    <button
                        type="button"
                        className="btn btn-primary btn-sm ms-3"
                        onClick={onSave}>
                        Save
                    </button>
                </div>
                <table className="table table-bordered">
                    <thead>
                        <tr className="row">
                            <th className="col-2" >Number</th>
                            <th className="col-2" >ID</th>
                            <th className="col-2" >Price</th>
                            <th className="col-2" >City</th>
                            <th className="col-2" >Type</th>
                            <th className="col-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <TableColumnRedactorRow
                            citiesOptions={citiesOptions}
                            typesOptions={typesOptions} />
                        {items?.map((item, index) =>
                            <TableRow
                                key={item.keyId}
                                item={item}
                                index={index}
                                citiesOptions={citiesOptions}
                                typesOptions={typesOptions} />
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Table;