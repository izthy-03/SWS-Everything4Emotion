import { Checkbox, Divider } from 'antd';
import { useEffect, useState } from 'react';

/**
 * SongPeriod is a checkbox for users to choose the decade they prefer
 *
 * Proptypes
 * @param {([]) => void} onChange: (function) triggered when checkbox is modified, takes checkedList as parameters
 */
const SongPeriod = (props) => {

  const CheckboxGroup = Checkbox.Group;
  const plainOptions = ['90s', '00s', '10s'];
  const defaultCheckedList = ['90s'];

  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);

  const onChange = (list) => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < plainOptions.length);
    setCheckAll(list.length === plainOptions.length);
  };

  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? plainOptions : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  // called when checkedList changed
  useEffect(() => {
    // console.log(checkedList);
    props.onChange(checkedList);
  }, [checkedList]);

  return (
    <>
      <p>Period of songs</p>
      <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
        Check all
      </Checkbox>
      <Divider />
      <CheckboxGroup options={plainOptions} value={checkedList} onChange={onChange} />
    </>
  );
};
export default SongPeriod;