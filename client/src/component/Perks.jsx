import React from 'react'

function Perks({selected, onChange}) {

  function handleCbClick (ev) {
    const {checked, name} = ev.target;
    if(checked) {
      onChange([... selected, name]);
    } else {
      onChange([...selected.filter(selcetedname => selcetedname != name)]);
    }
  }

  return (
    <div className="text-l grid grid-cols-4 gap-2">
    <label className='border p-4 flex rounded-xl gap-2 items-center'>
      <input type='checkbox' checked={selected.includes("wifi")} name="wifi" onChange={handleCbClick} />
      <span>Wifi</span>
    </label>
    <label className='border p-4 flex rounded-xl gap-2 items-center'>
      <input type='checkbox' checked={selected.includes("tv")} name="tv" onChange={handleCbClick} />
      <span>TV</span>
    </label>
    <label className='border p-4 flex rounded-xl gap-2 items-center'>
      <input type='checkbox' checked={selected.includes("pets")} name="pets" onChange={handleCbClick} />
      <span>Pets Allowed</span>
    </label>
    <label className='border p-4 flex rounded-xl gap-2 items-center'>
      <input type='checkbox' checked={selected.includes("parking")} name="parking" onChange={handleCbClick} />
      <span>Parking</span>
    </label>
  </div>
  )
}

export default Perks