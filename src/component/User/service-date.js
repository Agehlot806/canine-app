import React from 'react'
import Header from '../../directives/header'
import { Button, Col, Container, Row } from 'react-bootstrap'
import service from '../../assets/images/banner/service.png'
import { Form, Link } from 'react-router-dom'
import Footer from '../../directives/footer'

function Servicedate() {
    return (
        <>
            <Header />
            <Container fluid className='p-0'>
                <div className='all-bg'>
                    <img src={service} />
                </div>
            </Container>

            <section className='section-padding'>
                <Container>
                    <div className='service-dateCart'>
                        <div className='month-name'>
                            <h4>Jan</h4>
                        </div>
                        <div className='sevice-select-date'>
                            <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                <li className="nav-item">
                                    <a className="nav-link active" id="Set-tab" data-toggle="pill" href="#Set" role="tab" aria-controls="Set" aria-selected="true">Set <br /><span>20</span></a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="Sun-tab" data-toggle="pill" href="#Sun" role="tab" aria-controls="Sun" aria-selected="false">Sun <br /><span>21</span></a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="Mon-tab" data-toggle="pill" href="#Mon" role="tab" aria-controls="Mon" aria-selected="false">Mon <br /><span>22</span></a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="Tue-tab" data-toggle="pill" href="#Tue" role="tab" aria-controls="Tue" aria-selected="false">Tue <br /><span>23</span></a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="Wed-tab" data-toggle="pill" href="#Wed" role="tab" aria-controls="Wed" aria-selected="false">Wed <br /><span>24</span></a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="Thu-tab" data-toggle="pill" href="#Thu" role="tab" aria-controls="Thu" aria-selected="false">Thu <br /><span>25</span></a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="Fri-tab" data-toggle="pill" href="#Fri" role="tab" aria-controls="Fri" aria-selected="false">Fri <br /><span>26</span></a>
                                </li>
                            </ul>

                        </div>

                    </div>
                    <div className="needplace">
                        <div className="tab-content" id="pills-tabContent">
                            <div className="tab-pane fade show active" id="Set" role="tabpanel" aria-labelledby="Set-tab">
                                <div>
                                    <div className='selectService-date'>
                                        <h2>Time</h2>
                                        <ul className="nav nav-pills mb-3" role="tablist">
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="true">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">12:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:45</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">11:45</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">13:45</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:45</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:45</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>

                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className='add-petbtn'>
                                        <Button><Link to='/service-add-pet'>Add Pet</Link></Button>
                                    </div>
                                    <div className='form-pet'>
                                        <form>
                                            <div className="form-group">
                                                <select className="form-control">
                                                    <option>City</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4</option>
                                                    <option>5</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <input type="number" className="form-control" placeholder="+91 00000000" />
                                            </div>
                                        </form>
                                    </div>
                                    <div className='add-petbtn'>
                                        <Button><Link>Submit</Link></Button>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="Sun" role="tabpanel" aria-labelledby="Sun-tab">
                                <div>
                                    <div className='selectService-date'>
                                        <h2>Time</h2>
                                        <ul className="nav nav-pills mb-3" role="tablist">
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="true">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">12:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:45</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">11:45</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">13:45</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:45</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:45</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>

                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>

                                        </ul>
                                    </div>
                                    <div className='add-petbtn'>
                                        <Button><Link to='/service-add-pet'>Add Pet</Link></Button>
                                    </div>
                                    <div className='form-pet'>
                                        <form>
                                            <div className="form-group">
                                                <select className="form-control">
                                                    <option>City</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4</option>
                                                    <option>5</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <input type="number" className="form-control" placeholder="+91 00000000" />
                                            </div>
                                        </form>
                                    </div>
                                    <div className='add-petbtn'>
                                        <Button><Link>Submit</Link></Button>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="Mon" role="tabpanel" aria-labelledby="Mon-tab">
                                <div>
                                    <div className='selectService-date'>
                                        <h2>Time</h2>
                                        <ul className="nav nav-pills mb-3" role="tablist">
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="true">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">12:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:45</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">11:45</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">13:45</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:45</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:45</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>

                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className='add-petbtn'>
                                        <Button><Link to='/service-add-pet'>Add Pet</Link></Button>
                                    </div>
                                    <div className='form-pet'>
                                        <form>
                                            <div className="form-group">
                                                <select className="form-control">
                                                    <option>City</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4</option>
                                                    <option>5</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <input type="number" className="form-control" placeholder="+91 00000000" />
                                            </div>
                                        </form>
                                    </div>
                                    <div className='add-petbtn'>
                                        <Button><Link>Submit</Link></Button>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="Tue" role="tabpanel" aria-labelledby="Tue-tab">
                                <div>
                                    <div className='selectService-date'>
                                        <h2>Time</h2>
                                        <ul className="nav nav-pills mb-3" role="tablist">
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="true">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">12:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:45</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">11:45</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">13:45</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:45</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:45</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>

                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className='add-petbtn'>
                                        <Button><Link to='/service-add-pet'>Add Pet</Link></Button>
                                    </div>
                                    <div className='form-pet'>
                                        <form>
                                            <div className="form-group">
                                                <select className="form-control">
                                                    <option>City</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4</option>
                                                    <option>5</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <input type="number" className="form-control" placeholder="+91 00000000" />
                                            </div>
                                        </form>
                                    </div>
                                    <div className='add-petbtn'>
                                        <Button><Link>Submit</Link></Button>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="Wed" role="tabpanel" aria-labelledby="Wed-tab">
                                <div>
                                    <div className='selectService-date'>
                                        <h2>Time</h2>
                                        <ul className="nav nav-pills mb-3" role="tablist">
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="true">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">12:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:45</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">11:45</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">13:45</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:45</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:45</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>

                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className='add-petbtn'>
                                        <Button><Link to='/service-add-pet'>Add Pet</Link></Button>
                                    </div>
                                    <div className='form-pet'>
                                        <form>
                                            <div className="form-group">
                                                <select className="form-control">
                                                    <option>City</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4</option>
                                                    <option>5</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <input type="number" className="form-control" placeholder="+91 00000000" />
                                            </div>
                                        </form>
                                    </div>
                                    <div className='add-petbtn'>
                                        <Button><Link>Submit</Link></Button>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="Thu" role="tabpanel" aria-labelledby="Thu-tab">
                                <div>
                                    <div className='selectService-date'>
                                        <h2>Time</h2>
                                        <ul className="nav nav-pills mb-3" role="tablist">
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="true">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">12:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:45</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">11:45</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">13:45</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:45</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:45</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>

                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className='add-petbtn'>
                                        <Button><Link to='/service-add-pet'>Add Pet</Link></Button>
                                    </div>
                                    <div className='form-pet'>
                                        <form>
                                            <div className="form-group">
                                                <select className="form-control">
                                                    <option>City</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4</option>
                                                    <option>5</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <input type="number" className="form-control" placeholder="+91 00000000" />
                                            </div>
                                        </form>
                                    </div>
                                    <div className='add-petbtn'>
                                        <Button><Link>Submit</Link></Button>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="Fri" role="tabpanel" aria-labelledby="Fri-tab">
                            <div>
                                    <div className='selectService-date'>
                                        <h2>Time</h2>
                                        <ul className="nav nav-pills mb-3" role="tablist">
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="true">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">12:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:45</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">11:45</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">13:45</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:45</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:45</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>

                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">10:00</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className='add-petbtn'>
                                        <Button><Link to='/service-add-pet'>Add Pet</Link></Button>
                                    </div>
                                    <div className='form-pet'>
                                        <form>
                                            <div className="form-group">
                                                <select className="form-control">
                                                    <option>City</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4</option>
                                                    <option>5</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <input type="number" className="form-control" placeholder="+91 00000000" />
                                            </div>
                                        </form>
                                    </div>
                                    <div className='add-petbtn'>
                                        <Button><Link>Submit</Link></Button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </Container>
            </section>

            <Footer />
        </>
    )
}

export default Servicedate