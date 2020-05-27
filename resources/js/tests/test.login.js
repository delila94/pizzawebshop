import React, { Component } from 'react';
import  {shallow, configure } from 'enzyme';
import LoginPage from '../components/LoginN';
import Adapter from 'enzyme-adapter-react-16';
import {expect} from 'chai';

configure({adapter:new Adapter()});