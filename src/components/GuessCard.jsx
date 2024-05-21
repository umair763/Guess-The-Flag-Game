import React, { useState, useEffect } from "react";
import "./GuessCard.css";

// Import flag images
////////////note:: Africa
import ngImage from "./flag-images/country-flags-main/png1000px/ng.png"; // Nigeria
import etImage from "./flag-images/country-flags-main/png1000px/et.png"; // Ethiopia
import egImage from "./flag-images/country-flags-main/png1000px/eg.png"; // Egypt
import cdImage from "./flag-images/country-flags-main/png1000px/cd.png"; // Democratic Republic of the Congo
import tzImage from "./flag-images/country-flags-main/png1000px/tz.png"; // Tanzania
import keImage from "./flag-images/country-flags-main/png1000px/ke.png"; // Kenya
import zaImage from "./flag-images/country-flags-main/png1000px/za.png"; // South Africa
import ugImage from "./flag-images/country-flags-main/png1000px/ug.png"; // Uganda
import dzImage from "./flag-images/country-flags-main/png1000px/dz.png"; // Algeria
import sdImage from "./flag-images/country-flags-main/png1000px/sd.png"; // Sudan
import maImage from "./flag-images/country-flags-main/png1000px/ma.png"; // Morocco
import aoImage from "./flag-images/country-flags-main/png1000px/ao.png"; // Angola
import ghImage from "./flag-images/country-flags-main/png1000px/gh.png"; // Ghana
import mzImage from "./flag-images/country-flags-main/png1000px/mz.png"; // Mozambique
import mgImage from "./flag-images/country-flags-main/png1000px/mg.png"; // Madagascar
import cmImage from "./flag-images/country-flags-main/png1000px/cm.png"; // Cameroon
import ciImage from "./flag-images/country-flags-main/png1000px/ci.png"; // Côte d'Ivoire
import neImage from "./flag-images/country-flags-main/png1000px/ne.png"; // Niger
import bfImage from "./flag-images/country-flags-main/png1000px/bf.png"; // Burkina Faso
import mlImage from "./flag-images/country-flags-main/png1000px/ml.png"; // Mali

////////////note:: Asia
import cnImage from "./flag-images/country-flags-main/png1000px/cn.png"; //China
import inImage from "./flag-images/country-flags-main/png1000px/in.png"; // India
import idImage from "./flag-images/country-flags-main/png1000px/id.png"; // Indonesia
import pkImage from "./flag-images/country-flags-main/png1000px/pk.png"; // Pakistan
import bdImage from "./flag-images/country-flags-main/png1000px/bd.png"; // Bangladesh
import jpImage from "./flag-images/country-flags-main/png1000px/jp.png"; // Japan
import phImage from "./flag-images/country-flags-main/png1000px/ph.png"; // Philippines
import vnImage from "./flag-images/country-flags-main/png1000px/vn.png"; // Vietnam
import trImage from "./flag-images/country-flags-main/png1000px/tr.png"; // Turkey
import irImage from "./flag-images/country-flags-main/png1000px/ir.png"; // Iran
import thImage from "./flag-images/country-flags-main/png1000px/th.png"; // Thailand
import mmImage from "./flag-images/country-flags-main/png1000px/mm.png"; // Myanmar (Burma)
import krImage from "./flag-images/country-flags-main/png1000px/kr.png"; // South Korea
import iqImage from "./flag-images/country-flags-main/png1000px/iq.png"; // Iraq
import afImage from "./flag-images/country-flags-main/png1000px/af.png"; // Afghanistan
import saImage from "./flag-images/country-flags-main/png1000px/sa.png"; // Saudi Arabia
import uzImage from "./flag-images/country-flags-main/png1000px/uz.png"; // Uzbekistan
import myImage from "./flag-images/country-flags-main/png1000px/my.png"; // Malaysia
import yeImage from "./flag-images/country-flags-main/png1000px/ye.png"; // Yemen
import npImage from "./flag-images/country-flags-main/png1000px/np.png"; // Nepal

////////////note:: Europe
import ruImage from "./flag-images/country-flags-main/png1000px/ru.png"; // Russia
import deImage from "./flag-images/country-flags-main/png1000px/de.png"; // Germany
import gbImage from "./flag-images/country-flags-main/png1000px/gb.png"; // United Kingdom
import frImage from "./flag-images/country-flags-main/png1000px/fr.png"; // France
import itImage from "./flag-images/country-flags-main/png1000px/it.png"; // Italy
import esImage from "./flag-images/country-flags-main/png1000px/es.png"; // Spain
import uaImage from "./flag-images/country-flags-main/png1000px/ua.png"; // Ukraine
import plImage from "./flag-images/country-flags-main/png1000px/pl.png"; // Poland
import roImage from "./flag-images/country-flags-main/png1000px/ro.png"; // Romania
import nlImage from "./flag-images/country-flags-main/png1000px/nl.png"; // Netherlands
import beImage from "./flag-images/country-flags-main/png1000px/be.png"; // Belgium
import grImage from "./flag-images/country-flags-main/png1000px/gr.png"; // Greece
import czImage from "./flag-images/country-flags-main/png1000px/cz.png"; // Czech Republic
import ptImage from "./flag-images/country-flags-main/png1000px/pt.png"; // Portugal
import seImage from "./flag-images/country-flags-main/png1000px/se.png"; // Sweden
import huImage from "./flag-images/country-flags-main/png1000px/hu.png"; // Hungary
import byImage from "./flag-images/country-flags-main/png1000px/by.png"; // Belarus
import atImage from "./flag-images/country-flags-main/png1000px/at.png"; // Austria
import chImage from "./flag-images/country-flags-main/png1000px/ch.png"; // Switzerland
import bgImage from "./flag-images/country-flags-main/png1000px/bg.png"; // Bulgaria

////////////note:: North America
import usImage from "./flag-images/country-flags-main/png1000px/us.png"; // United States
import mxImage from "./flag-images/country-flags-main/png1000px/mx.png"; // Mexico
import caImage from "./flag-images/country-flags-main/png1000px/ca.png"; // Canada
import gtImage from "./flag-images/country-flags-main/png1000px/gt.png"; // Guatemala
import cuImage from "./flag-images/country-flags-main/png1000px/cu.png"; // Cuba
import htImage from "./flag-images/country-flags-main/png1000px/ht.png"; // Haiti
import doImage from "./flag-images/country-flags-main/png1000px/do.png"; // Dominican Republic
import hnImage from "./flag-images/country-flags-main/png1000px/hn.png"; // Honduras
import svImage from "./flag-images/country-flags-main/png1000px/sv.png"; // El Salvador
import niImage from "./flag-images/country-flags-main/png1000px/ni.png"; // Nicaragua
import crImage from "./flag-images/country-flags-main/png1000px/cr.png"; // Costa Rica
import paImage from "./flag-images/country-flags-main/png1000px/pa.png"; // Panama
import jmImage from "./flag-images/country-flags-main/png1000px/jm.png"; // Jamaica
import ttImage from "./flag-images/country-flags-main/png1000px/tt.png"; // Trinidad and Tobago
import bsImage from "./flag-images/country-flags-main/png1000px/bs.png"; // Bahamas
import bzImage from "./flag-images/country-flags-main/png1000px/bz.png"; // Belize
import bbImage from "./flag-images/country-flags-main/png1000px/bb.png"; // Barbados
import lcImage from "./flag-images/country-flags-main/png1000px/lc.png"; // Saint Lucia
import gdImage from "./flag-images/country-flags-main/png1000px/gd.png"; // Grenada
import vcImage from "./flag-images/country-flags-main/png1000px/vc.png"; // Saint Vincent and the Grenadines

////////////note:: South America
import brImage from "./flag-images/country-flags-main/png1000px/br.png"; // Brazil
import coImage from "./flag-images/country-flags-main/png1000px/co.png"; // Colombia
import arImage from "./flag-images/country-flags-main/png1000px/ar.png"; // Argentina
import peImage from "./flag-images/country-flags-main/png1000px/pe.png"; // Peru
import veImage from "./flag-images/country-flags-main/png1000px/ve.png"; // Venezuela
import clImage from "./flag-images/country-flags-main/png1000px/cl.png"; // Chile
import ecImage from "./flag-images/country-flags-main/png1000px/ec.png"; // Ecuador
import boImage from "./flag-images/country-flags-main/png1000px/bo.png"; // Bolivia
import pyImage from "./flag-images/country-flags-main/png1000px/py.png"; // Paraguay
import uyImage from "./flag-images/country-flags-main/png1000px/uy.png"; // Uruguay
import gyImage from "./flag-images/country-flags-main/png1000px/gy.png"; // Guyana
import srImage from "./flag-images/country-flags-main/png1000px/sr.png"; // Suriname
import gfImage from "./flag-images/country-flags-main/png1000px/gf.png"; // French Guiana
import fkImage from "./flag-images/country-flags-main/png1000px/fk.png"; // Falkland Islands
import gsImage from "./flag-images/country-flags-main/png1000px/gs.png"; // South Georgia and the South Sandwich Islands

////////////note:: Australia

import pgImage from "./flag-images/country-flags-main/png1000px/pg.png"; // Papua New Guinea
import nzImage from "./flag-images/country-flags-main/png1000px/nz.png"; // New Zealand
import fjImage from "./flag-images/country-flags-main/png1000px/fj.png"; // Fiji
import sbImage from "./flag-images/country-flags-main/png1000px/sb.png"; // Solomon Islands
import vuImage from "./flag-images/country-flags-main/png1000px/vu.png"; // Vanuatu
import wsImage from "./flag-images/country-flags-main/png1000px/ws.png"; // Samoa
import kiImage from "./flag-images/country-flags-main/png1000px/ki.png"; // Kiribati
import toImage from "./flag-images/country-flags-main/png1000px/to.png"; // Tonga
import fmImage from "./flag-images/country-flags-main/png1000px/fm.png"; // Micronesia
import mhImage from "./flag-images/country-flags-main/png1000px/mh.png"; // Marshall Islands
import pwImage from "./flag-images/country-flags-main/png1000px/pw.png"; // Palau
import tvImage from "./flag-images/country-flags-main/png1000px/tv.png"; // Tuvalu
import nrImage from "./flag-images/country-flags-main/png1000px/nr.png"; // Nauru
import ckImage from "./flag-images/country-flags-main/png1000px/ck.png"; // Cook Islands
import nuImage from "./flag-images/country-flags-main/png1000px/nu.png"; // Niue
import asImage from "./flag-images/country-flags-main/png1000px/as.png"; // American Samoa
import wfImage from "./flag-images/country-flags-main/png1000px/wf.png"; // Wallis and Futuna
import nfImage from "./flag-images/country-flags-main/png1000px/nf.png"; // Norfolk Island
import pnImage from "./flag-images/country-flags-main/png1000px/pn.png"; // Pitcairn Islands

/////////////////////

function GuessCard({ onGameFinish, selectedContinent }) {
	const [flags, setFlags] = useState([]);
	const [currentFlagIndex, setCurrentFlagIndex] = useState(0);
	const [options, setOptions] = useState([]);
	const [correctGuesses, setCorrectGuesses] = useState(0);
	const [attemptedScore, setAttemptedScore] = useState(0);
	const [incorrectGuesses, setIncorrectGuesses] = useState(0);
	const [totalScore, setTotalScore] = useState(0);

	// Shuffle function
	const shuffle = (array) => {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	};

	useEffect(() => {
		const getFlagsByContinent = () => {
			switch (selectedContinent) {
				case "Africa":
					return [
						{ country: "Nigeria", image: ngImage },
						{ country: "Ethiopia", image: etImage },
						{ country: "Egypt", image: egImage },
						{ country: "Democratic Republic of the Congo", image: cdImage },
						{ country: "Tanzania", image: tzImage },
						{ country: "South Africa", image: zaImage },
						{ country: "Kenya", image: keImage },
						{ country: "Uganda", image: ugImage },
						{ country: "Algeria", image: dzImage },
						{ country: "Sudan", image: sdImage },
						{ country: "Morocco", image: maImage },
						{ country: "Angola", image: aoImage },
						{ country: "Ghana", image: ghImage },
						{ country: "Mozambique", image: mzImage },
						{ country: "Madagascar", image: mgImage },
						{ country: "Cameroon", image: cmImage },
						{ country: "Ivory Coast", image: ciImage },
						{ country: "Niger", image: neImage },
						{ country: "Burkina Faso", image: bfImage },
						{ country: "Mali", image: mlImage },
					];

				case "Asia":
					return [
						{ country: "China", image: cnImage },
						{ country: "India", image: inImage },
						{ country: "Indonesia", image: idImage },
						{ country: "Pakistan", image: pkImage },
						{ country: "Bangladesh", image: bdImage },
						{ country: "Japan", image: jpImage },
						{ country: "Philippines", image: phImage },
						{ country: "Vietnam", image: vnImage },
						{ country: "Turkey", image: trImage },
						{ country: "Iran", image: irImage },
						{ country: "Thailand", image: thImage },
						{ country: "Myanmar (Burma)", image: mmImage },
						{ country: "South Korea", image: krImage },
						{ country: "Iraq", image: iqImage },
						{ country: "Afghanistan", image: afImage },
						{ country: "Saudi Arabia", image: saImage },
						{ country: "Uzbekistan", image: uzImage },
						{ country: "Malaysia", image: myImage },
						{ country: "Yemen", image: yeImage },
						{ country: "Nepal", image: npImage },
					];

				case "Europe":
					return [
						{ country: "Russia", image: ruImage },
						{ country: "Germany", image: deImage },
						{ country: "United Kingdom", image: gbImage },
						{ country: "France", image: frImage },
						{ country: "Italy", image: itImage },
						{ country: "Spain", image: esImage },
						{ country: "Ukraine", image: uaImage },
						{ country: "Poland", image: plImage },
						{ country: "Romania", image: roImage },
						{ country: "Netherlands", image: nlImage },
						{ country: "Belgium", image: beImage },
						{ country: "Greece", image: grImage },
						{ country: "Czech Republic", image: czImage },
						{ country: "Portugal", image: ptImage },
						{ country: "Sweden", image: seImage },
						{ country: "Hungary", image: huImage },
						{ country: "Belarus", image: byImage },
						{ country: "Austria", image: atImage },
						{ country: "Switzerland", image: chImage },
						{ country: "Bulgaria", image: bgImage },
					];

				case "North America":
					return [
						{ country: "United States", image: usImage },
						{ country: "Mexico", image: mxImage },
						{ country: "Canada", image: caImage },
						{ country: "Guatemala", image: gtImage },
						{ country: "Cuba", image: cuImage },
						{ country: "Haiti", image: htImage },
						{ country: "Dominican Republic", image: doImage },
						{ country: "Honduras", image: hnImage },
						{ country: "El Salvador", image: svImage },
						{ country: "Nicaragua", image: niImage },
						{ country: "Costa Rica", image: crImage },
						{ country: "Panama", image: paImage },
						{ country: "Jamaica", image: jmImage },
						{ country: "Trinidad and Tobago", image: ttImage },
						{ country: "Bahamas", image: bsImage },
						{ country: "Belize", image: bzImage },
						{ country: "Barbados", image: bbImage },
						{ country: "Saint Lucia", image: lcImage },
						{ country: "Grenada", image: gdImage },
						{ country: "Saint Vincent and the Grenadines", image: vcImage },
					];

				case "South America":
					return [
						{ country: "Brazil", image: brImage },
						{ country: "Colombia", image: coImage },
						{ country: "Argentina", image: arImage },
						{ country: "Peru", image: peImage },
						{ country: "Venezuela", image: veImage },
						{ country: "Chile", image: clImage },
						{ country: "Ecuador", image: ecImage },
						{ country: "Bolivia", image: boImage },
						{ country: "Paraguay", image: pyImage },
						{ country: "Uruguay", image: uyImage },
						{ country: "Guyana", image: gyImage },
						{ country: "Suriname", image: srImage },
						{ country: "French Guiana", image: gfImage },
						{ country: "Falkland Islands", image: fkImage },
						{ country: "South Georgia and the South Sandwich Islands", image: gsImage },
					];

				case "Australia":
					return [
						{ country: "Papua New Guinea", image: pgImage },
						{ country: "New Zealand", image: nzImage },
						{ country: "Fiji", image: fjImage },
						{ country: "Solomon Islands", image: sbImage },
						{ country: "Vanuatu", image: vuImage },
						{ country: "Samoa", image: wsImage },
						{ country: "Kiribati", image: kiImage },
						{ country: "Tonga", image: toImage },
						{ country: "Micronesia", image: fmImage },
						{ country: "Marshall Islands", image: mhImage },
						{ country: "Palau", image: pwImage },
						{ country: "Tuvalu", image: tvImage },
						{ country: "Nauru", image: nrImage },
						{ country: "Cook Islands", image: ckImage },
						{ country: "Niue", image: nuImage },
						{ country: "American Samoa", image: asImage },
						{ country: "Wallis and Futuna", image: wfImage },
						{ country: "Norfolk Island", image: nfImage },
						{ country: "Pitcairn Islands", image: pnImage },
					];

				default:
					return [];
			}
		};

		// Shuffle the flags array before setting it in the state
		const shuffledFlags = shuffle(getFlagsByContinent(selectedContinent));
		setFlags(shuffledFlags);
		setTotalScore(shuffledFlags.length); // Set total score based on the number of flags
	}, [selectedContinent]);

	useEffect(() => {
		if (flags.length > 0) {
			const selectedFlag = flags[currentFlagIndex];
			const correctOption = selectedFlag.country;

			// Shuffle the flags array and filter out the correct option
			const shuffledFlags = shuffle(flags.filter((flag) => flag.country !== correctOption));

			// Select three incorrect options randomly
			const incorrectOptions = shuffledFlags.slice(0, 3).map((flag) => flag.country);

			// Combine correct and incorrect options and shuffle them
			const allOptions = shuffle([...incorrectOptions, correctOption]);

			setOptions(allOptions);
		}
	}, [flags, currentFlagIndex]);

	const handleOptionClick = (selectedOption) => {
		const isCorrect = selectedOption === flags[currentFlagIndex]?.country;
		setAttemptedScore((prevScore) => prevScore + 1); // Increment attempted score

		// Remove existing coloring classes from all options
		const optionElements = document.querySelectorAll(".grid-item");
		optionElements.forEach((element) => {
			element.classList.remove("correct", "incorrect");
		});

		// Add coloring class to the selected option
		const selectedOptionElement = document.querySelector(`[data-option="${selectedOption}"]`);
		if (selectedOptionElement) {
			selectedOptionElement.classList.add(isCorrect ? "correct" : "incorrect");
		}

		// Update score counters
		if (isCorrect) {
			console.log("Correct answer!");
			setCorrectGuesses((prevCount) => prevCount + 1);
		} else {
			console.log("Incorrect answer!");
			setIncorrectGuesses((prevCount) => prevCount + 1);
		}
	};

	// Sample render function for options
	const renderOptions = (options) => {
		return options.map((option, index) => (
			<div
				key={index}
				data-option={option}
				className="grid-item"
				onClick={() => handleOptionClick(option)}>
				{option}
			</div>
		));
	};

	const handleNextClick = () => {
		if (currentFlagIndex < flags.length - 1) {
			setCurrentFlagIndex((prevIndex) => prevIndex + 1);
		} else {
			onGameFinish(totalScore, attemptedScore, correctGuesses, incorrectGuesses);
		}
	};

	return (
		<div className="cardd">
			<h5 className="nameflag">Name That Flag!</h5>
			<div className="container">
				{flags[currentFlagIndex] && (
					<img
						src={flags[currentFlagIndex].image}
						alt={flags[currentFlagIndex].country}
					/>
				)}
			</div>
			<div className="grid-container">
				{options.map((option, index) => (
					<div
						key={index}
						className={`grid-item ${option}`}
						data-option={option}
						onClick={() => handleOptionClick(option)}>
						{option}
					</div>
				))}
			</div>
			<button
				className="nextbtn"
				onClick={handleNextClick}>
				Next
			</button>
		</div>
	);
}

export default GuessCard;
