import React, { useState, useEffect, useRef } from 'react';
import supabase from '../../../config/SuperbaseClient';
import './Tour.css';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const Tours = () => {
    const [numbers, setNumbers] = useState({});
    const [totalData, setData] = useState(null);
    const [error, setError] = useState(null);
    const cardsRef = useRef([]); 

    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await supabase
                .from('Tours-data')
                .select();

            if (data) {
                setData(data);
                setError(null);
            }

            if (error) {
                setData(null);
                setError('Could not fetch the data');
                console.log(error);
            }
        };
        fetchData();
    }, []);

    console.log(totalData);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate');
                    }
                });
            },
            { threshold: 0.2 }
        );

        cardsRef.current.forEach((card) => {
            if (card) observer.observe(card);
        });

        return () => {
            cardsRef.current.forEach((card) => {
                if (card) observer.unobserve(card);
            });
        };
    }, [totalData]);

    const handleClick = (index) => {
        setNumbers((prevNumbers) => {
            const newNumber = (prevNumbers[index] || 1) + 1;
            return {
                ...prevNumbers,
                [index]: newNumber,
            };
        });
    };
    
    const handleMinus = (index)=>{
        setNumbers((prevNumbers)=>{
            const newNumber = (prevNumbers[index] || 1) -1;
            return {
                ...prevNumbers,
                [index]:newNumber,
            }
        })
    }


    const calculatePrice = (price, index) => {
        const numMembers = numbers[index] || 1;
        return price * numMembers;
    };

    const handleNavigate = () => {
        window.scrollTo(0, 0);  
      };

    return (
        <div className="tours">
            {totalData &&
                totalData.map((card, index) => (
                    <div
                        className="tour-card"
                        key={index}
                        ref={(el) => (cardsRef.current[index] = el)}
                    >
                        <img
                            className="card-image"
                            style={{ width: '330px', height: '200px' }}
                            src={card.image}
                            alt=""
                        />
                        <Typography variant="h6">{card.placeName}</Typography>
                        <hr />
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-evenly',
                                width: '100%',
                               
                            }}
                        >
                            <p style={{cursor:'pointer',fontSize:"24px"}} onClick={()=> handleMinus(index)}   variant="outlined"
                                color="primary" >-</p>
                            <Typography
                               
                            >
                               <button>{numbers[index] || 1} Persons</button> 
                            </Typography> 
                            <p style={{cursor:'pointer',fontSize:"24px"}}   onClick={() => handleClick(index)}
                                variant="outlined"
                                color="primary" >+</p>
                            <Typography variant="body1">
                                {`₹${calculatePrice(card.price, index).toLocaleString()}/-`}
                            </Typography>
                        </div>
                        <hr />
                        <Typography variant="body1">{card.description}</Typography>
                        <Link to={`${card.id}`} onClick={handleNavigate}>
                            <Button variant="contained" color="primary">
                                VIEW DETAILS
                            </Button>
                        </Link>
                    </div>
                ))}
        </div>
    );
};

export default Tours;
