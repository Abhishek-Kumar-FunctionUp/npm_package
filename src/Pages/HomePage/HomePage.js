import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Input from '../../Atom/Input/Input';
import Button from '../../Atom/Button/Button';
import TextArea from '../../Atom/TextArea/TextArea';
import style from './HomePage.module.css'
import Swal from 'sweetalert2';
export default function App() {
  const [search, setSearch] = useState('');
  const [text, setText] = useState('');
  const [list, setList] = useState([]);
  const [favItem, setFavItem] = useState({});


  useEffect(() => {
    //with the help of setTimeout debouncing is added
    const getData = setTimeout(() => {
      fetch(`https://api.npms.io/v2/search?q=${search}`)
        //using Template literals
        .then((res) => res.json())
        .then((data) => {
          setList(data?.results);
        });
    }, 1000);

    return () => clearTimeout(getData);
    //clear instance of useEffect we have do avoid memory leakage if our components get unmounted
  }, [search]);

  // console.log(favItem)

  function handleClick(item) {
    // console.log(item, 'click');
    setFavItem(item);
  }
  // console.log(favItem, '');
  function submit() {
    if (!text) {
        Swal.fire({  
            title: 'Please Explain Few Words',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
          })
    } else {
      const selectFavItem = {
        name: favItem.package?.name,
        version: favItem.package?.version,
        description: favItem.package.description,
        yourText: text,
        isEdit : false
      };
      console.log(selectFavItem, 'uuuy');
      //get all the data from local storage
      const favList = JSON.parse(localStorage.getItem('favList')) || [];
      //checking wether the choosed item is there in the local storage or not
      const findFavList = favList.find(
        (element) => element?.name === selectFavItem?.name
      );
      if (findFavList) {
        Swal.fire({  
            title: 'This Package is Already in List',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
          })
      } else {
        const _favList = [selectFavItem, ...favList];
        localStorage.setItem('favList', JSON.stringify(_favList));
        setSearch('');
        setText('');
        setFavItem({});
      }
    }
  }
  return (
    <div className={style.main}>
    <img src='https://upload.wikimedia.org/wikipedia/commons/d/db/Npm-logo.svg'
        alt='npm'
        width="100px"
    />
    <div className={style.header}>
    <div className={style.search}>
    <h2>Search for NPM packages</h2>
      <Input
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search Package..."
        value={search}
        type="text"
      />
      </div>
      <button className={style.btn}><Link to="/fav_list" className={style.link}>Favourite packages </Link></button>
      </div>
      {list?.length ? (
        <div className={style.listHeading}>
          <h4>Results</h4>
          <div className={style.listDiv}>
            {list.map((item, index) => (
              <div onClick={() => handleClick(item)} key={index} className={style.package}>
                <Input name="package" id={item.package.name} type="radio" />
                <label htmlFor={item.name}>{item.package.name}</label>
              </div>
            ))}
          </div>{' '}
        </div>
      ) : (
        ""
      )}

      <div className={style.submitText}>
        {favItem.package ? (
          <>
            <h4>Why this is your favourite package?</h4>
            <TextArea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows="6"
              cols="50"
              placeholder="Please explain this in few words.. "
            />
            <br />
            <Button onClick={submit} text="Submit" className={style.submitBtn}/>
          </>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}
