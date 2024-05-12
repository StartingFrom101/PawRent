import axios from 'axios';
import React, { useState } from 'react'

function PhotosUploader({ addedPhotos, onChange }) {
    const [photoLink, setPhotoLink] = useState('');

    async function addPhotoLink(ev) {
        ev.preventDefault();
        try {
            const { data: filename } = await axios.post('/upload-by-link', { link: photoLink });
            await onChange(prev => {
                return [...prev, filename];
            });
            setPhotoLink('');
        } catch (e) {
            alert(e);
        }
        console.log(addedPhotos);
    }

    async function uploadPhoto(ev) {
        const files = ev.target.files;
        const data = new FormData();

        for (let i = 0; i < files.length; i++) {
            data.append('photos', files[i]);
        }

        axios.post('/upload', data, {
            headers: { "Content-Type": 'multipart/form-data' }
        }).then(response => {
            const { data: filenames } = response;
            onChange(prev => {
                return [...prev, ...filenames];
            });
        });
        // console.log({files});

    }

    function removePhoto(ev, filename) {
        ev.preventDefault();
        onChange([...addedPhotos.filter(photo => photo !== filename)]);
    }

    function selectAsMainPhoto(ev, filename) {
        ev.preventDefault();
        const newAddedPhotos = [filename, ...addedPhotos.filter(photo => photo !== filename)];
        onChange(newAddedPhotos);
    } 

    return (
        <>
            <div className='flex gap-3'>
                <input type="text" value={photoLink} onChange={ev => setPhotoLink(ev.target.value)} placeholder="Add using URL " />
                <button className='px-3 rounded-lg w-1/6' onClick={addPhotoLink}>Add Photo</button>
            </div>
            <div className='mt-2 grid grid-cols-6 gap-2'>

                {addedPhotos.length > 0 && addedPhotos.map(link => (
                    <div className='h-32 relative flex' key={link}>
                        <button onClick={ev => { removePhoto(ev, link) }} className='text-sm absolute'>Delete</button>

                        {link == addedPhotos[0] && (
                            <button onClick={ev => { selectAsMainPhoto(ev, link) }} className='text-sm absolute bottom-1'>Mained</button>
                        )}
                        {link != addedPhotos[0] && (
                            <button onClick={ev => { selectAsMainPhoto(ev, link) }} className='text-sm absolute bottom-1'>Main</button>
                        )}
                        
                        <img className='rounded-2xl w-full object-cover' src={'http://localhost:4000/uploads/' + link} />
                    </div>
                ))}

                <label className="border cursor-pointer flex items-center gap-2 bg-transparent rounded-2xl p-8 text-2xl text-gray-600">
                    <input type='file' multiple className='hidden' onChange={uploadPhoto} />

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
                    </svg>
                    Add From Device</label>
            </div>
        </>
    )
}

export default PhotosUploader