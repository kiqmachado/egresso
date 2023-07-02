import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import {  useNavigate } from "react-router-dom";
import { auth, db } from './../../firebase-config'
import {  collection, doc, setDoc } from 'firebase/firestore';
import './../../css/stylesPerfilUsuario.css';
import Header from '../../components/Header';

const perfilUsuario = () => {



  return (
  <div>
  <title>Egresso</title>
  <header id="header" ><Header/></header>
  <main id="perfilUsuario">
    
  <form
    className="box"
    action="{{url_for('membros.atualizar_page')}}"
    method="post"
  >
    <section className="user-profile">
      <div className="headerPU">
        <div className="cover">
          <div className="perfil-usuario-avatar">
            <img
              src="http://www.coopernortetelecom.com.br/assets/images/author-1.png"
              alt="img-avatar"
            />
            <button type="button" className="boton-avatar">
              <i className="far fa-image" />
            </button>
          </div>
        </div>
      </div>
      <div className="user-profile-body">
        <div className="user-profile-bio">
          <ul align="left" className="data-list">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Nome:
              </label>
              <input
                type="text"
                className="form-control"
                name="nv_nome"
                placeholder="Nome"
                defaultValue=""
              />
            </div>
          </ul>
        </div>
        <div className="user-profile-footer">
          <ul className="data-list">
            <div className="mb-3">
              <label htmlFor="emaill" className="form-label">
                Email:
              </label>
              <input
                type="email"
                className="form-control"
                name="nv_email"
                placeholder="Email"
                defaultValue="usuario@gmail.com"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="cpf" className="form-label">
                CPF:
              </label>
              <input
                type="text"
                className="form-control"
                name="nv_cpf"
                placeholder="123.456.789-10"
                defaultValue=""
              />
            </div>
            <div className="mb-3">
              <label htmlFor="dataDeNascimento" className="form-label">
                Data de nascimento:
              </label>
              <input
                type="date"
                className="form-control"
                name="nv_dataDeNascimento"
                placeholder="Idade"
                defaultValue="{{current_user.idade}}"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="WhatsApp" className="form-label">
                WhatsApp:
              </label>
              <input
                type="text"
                className="form-control"
                name="nv_WhatsApp"
                placeholder="(DDD) 11111-1111"
                defaultValue=""
              />
            </div>
            <div className="mb-3">
              <label htmlFor="LinkedIn" className="form-label">
                LinkedIn:
              </label>
              <input
                type="text"
                className="form-control"
                name="nv_LinkedIn"
                placeholder="LinkedIn"
                defaultValue=""
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Instagram" className="form-label">
                Instagram:
              </label>
              <input
                type="text"
                className="form-control"
                name="nv_Instagram"
                placeholder="@seunome"
                defaultValue=""
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Facebook" className="form-label">
                Facebook:
              </label>
              <input
                type="text"
                className="form-control"
                name="nv_Facebook"
                placeholder="Facebook"
                defaultValue=""
              />
            </div>
            <div className="mb-3 form-check">
              <label className="form-check-label">
                Veja aqui nossos{" "}
                <a href="url_dos_termos_de_uso">Termos De Uso</a>
              </label>
            </div>
            
            <div className="btnPUGeral">
              <button type="submit" value="" className="btnPU">
                Editar meu depoimento
              </button>
              <button type="submit" value="" className="btnPU">
                Excluir meu depoimento
              </button>
              <button type="submit" value="" className="btnPU">
              Ver meu depoimento
              </button>
            </div>

            <button type="submit" value="" className="btnPUDepoimento">
              Salvar minhas alterações
            </button>
          </ul>
        </div>
      </div>
    </section>
  </form>
  {/* <label for="file-upload" class="custom-file-upload">
    <i class="far fa-image"></i>
  </label>
  <input class="btnPU" id="" type="file" name="img" required /> */}
  </main>
  <footer id="footer" />
  </div>

  
  );
};

export default perfilUsuario;