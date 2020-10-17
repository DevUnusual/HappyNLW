import React, { ChangeEvent, FormEvent, useState } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
// import { LeafletMouseEvent} from 'leaflet';

import { FiPlus } from "react-icons/fi";

import '../styles/pages/create-orphanage.css';
import Sidebar from "../components/Sidebar";
import MapIcon from "../utils/mapIcon";
import api from "../services/api";
import { useHistory } from "react-router-dom";

export default function CreateOrphanage() {
  const history = useHistory();
  const [position, setPosition] = useState({latitude:0, longitude:0})

  const [name, setName] = useState('')
  const [about, setAbout] = useState('')
  const [instructions, setInstructions] = useState('')
  const [Opening_hours, setOpeningHours] = useState('')
  const [Open_on_weekends, setOpenOnWeekends] = useState(true)
  const [images, SetImages] = useState<File[]>([])
  const [previewImages, setPreviewImages] = useState<string[]>([])

  function handleMapClick(event : any){
    const {lat, lng} = event.latlng;
    setPosition({
      latitude: lat,
      longitude: lng,
    });
  }

  async function handleSubmit(event : FormEvent){
    event.preventDefault();

    const {latitude, longitude} = position;

    const data = new FormData();

    data.append('name', name);
    data.append('about', about);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('instructions', instructions);
    data.append('opening_hours', Opening_hours);
    data.append('open_on_weekends', String(Open_on_weekends));
    images.forEach(image =>{
      data.append('images', image);
    })

    await api.post('orphanages', data)

    alert('cadastro finalizado com sucesso!')

    history.push('/app');
  }

  function handleSelectImages(event : ChangeEvent<HTMLInputElement>){
    if(!event.target.files){
      return;
    }
    const selectedImg = Array.from(event.target.files)
    SetImages(selectedImg);

    const selectedImages = selectedImg.map(image =>{
      return URL.createObjectURL(image);
    });

    setPreviewImages(selectedImages);

  }


  return (
    <div id="page-create-orphanage">
      <Sidebar/>

      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <Map 
              center={[-5.1152628,-42.7759954]} 
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onclick={handleMapClick}
            >
              <TileLayer 
                url={`https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />

              {position.latitude !== 0 && (
               <Marker 
               interactive={false} 
               icon={MapIcon} 
               position={[position.latitude,position.longitude]} />)}
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input id="name" 
              value={name} 
              onChange={e => setName(e.target.value)}  />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea id="name" maxLength={300} 
              value={about} 
              onChange={e => setAbout(e.target.value)}/>
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {previewImages.map(image =>{
                  return (
                    <img key={image} src={image} alt={name} />
                  )
                })}
              <label htmlFor="image[]" className="new-image">
                <FiPlus size={24} color="#15b6d6" />
              </label>

              </div>
              <input multiple onChange={handleSelectImages} type="file" id="image[]" />
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea id="instructions" 
              value={instructions} 
              onChange={e => setInstructions(e.target.value)}/>
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horario de funcionamento</label>
              <input id="opening_hours" 
              value={Opening_hours} 
              onChange={e => setOpeningHours(e.target.value)}/>
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button type="button" 
                className={Open_on_weekends ? 'active' : ''}
                onClick={() => setOpenOnWeekends(true)}
                >Sim
                </button>
                <button 
                type="button"
                className={!Open_on_weekends ? 'active-no' : ''}
                onClick={() => setOpenOnWeekends(false)}
                >Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
