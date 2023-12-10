import { useEffect, useRef } from "react";
import { OptionType } from "../redux/slices/selectSlice";
import 'select2/dist/css/select2.min.css';
import 'select2';
import $ from "jquery";

const Select = ({
    options,
    placeholder,
    value,
    onChange,
}: {
    options: Array<OptionType>,
    placeholder?: string,
    value: string,
    onChange: (val: string) => void
}) => {
    const selectRef = useRef<HTMLSelectElement | null>(null);

    useEffect(() => {
        const $select = $(selectRef.current!);

        $select.select2().on('change', (e) => {
            onChange(e.target.value);
        });

        return () => {
            $select.select2('destroy').off('change');
        };
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(e.target.value);
    };

    useEffect(() => {
        const $select = $(selectRef.current!);
        $select.val(value).trigger('change');
    }, [value])

    return (
        <div>
            <select
                style={{ width: '100%' }}
                ref={selectRef}
                value={value}
                onChange={handleChange}
            >
                <option value="">{placeholder || 'Select option'}</option>
                {options?.map(item =>
                    <option key={item.id} value={item.id}>{item.name}</option>)}
            </select>
        </div>
    )
}

export default Select