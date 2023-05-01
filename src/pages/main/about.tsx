import React from "react";
import styled from "styled-components";

const ContactWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  padding: 20px;
`;


const Title = styled.h1`
  font-size: 48px;
  margin-bottom: 20px;
  text-align: center;
`;


const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;



const TextArea = styled.textarea`
  padding: 10px;
  margin-bottom: 10px;
  width: 100%;
`;


export function About () {

    return (
        <ContactWrapper>
            <Title>Contact Me</Title>
            <div className="col-md-3 text-center">
                <ul className="list-unstyled mb-0">
                    <li>
                        {/*<img src="https://github.com/pyyogi.png"/>*/}
                    </li>
                    <li><i className="fas fa-map-marker-alt fa-2x"></i>
                        <p>Moscow</p>
                    </li>

                    <li><i className="fas fa-phone mt-4 fa-2x"></i>
                        <p></p>
                    </li>

                    <li><i className="fas fa-envelope mt-4 fa-2x"></i>
                        <p>215796@edu.fa.ru</p>
                    </li>
                </ul>
            </div>
        </ContactWrapper>
    );
};