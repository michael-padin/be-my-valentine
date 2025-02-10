"use client";

import { useState, useEffect, useRef } from "react";
import { Heart } from "lucide-react";
import dynamic from "next/dynamic";

const Confetti = dynamic(() => import("react-confetti"), { ssr: false });

export function ValentineCard() {
	const [showMessage, setShowMessage] = useState(false);
	const [showConfetti, setShowConfetti] = useState(false);
	const [isMobile, setIsMobile] = useState(false);
	const cardRef = useRef<HTMLDivElement>(null);
	const yesButtonRef = useRef<HTMLButtonElement>(null);

	const drawHeart = (ctx: CanvasRenderingContext2D) => {
		ctx.beginPath();
		ctx.moveTo(37.5, 20);
		ctx.bezierCurveTo(37.5, 17, 35, 13.5, 25, 13.5);
		ctx.bezierCurveTo(10, 13.5, 10, 27.5, 10, 27.5);
		ctx.bezierCurveTo(10, 37, 20, 46, 37.5, 55);
		ctx.bezierCurveTo(55, 46, 65, 37, 65, 27.5);
		ctx.bezierCurveTo(65, 27.5, 65, 13.5, 50, 13.5);
		ctx.bezierCurveTo(42.5, 13.5, 37.5, 17, 37.5, 20);
		ctx.fill();
	};
	useEffect(() => {
		const checkMobile = () => setIsMobile(window.innerWidth < 768);
		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	const moveButton = () => {
		const button = document.getElementById("noButton");
		const card = cardRef.current;
		const yesButton = yesButtonRef.current;
		if (button && card && yesButton) {
			const cardRect = card.getBoundingClientRect();
			const buttonRect = button.getBoundingClientRect();
			const yesButtonRect = yesButton.getBoundingClientRect();

			let newX, newY;
			do {
				newX = Math.random() * (cardRect.width - buttonRect.width);
				newY = Math.random() * (cardRect.height - buttonRect.height);
			} while (
				Math.abs(newX - (yesButtonRect.left - cardRect.left)) <
					buttonRect.width &&
				Math.abs(newY - (yesButtonRect.top - cardRect.top)) < buttonRect.height
			);

			button.style.position = "absolute";
			button.style.left = `${newX}px`;
			button.style.top = `${newY}px`;
			button.style.transition = "all 0.3s ease";
		}
	};

	const handleYesClick = () => {
		setShowMessage(true);
		setShowConfetti(true);
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 via-red-100 to-pink-200 p-4">
			<div
				ref={cardRef}
				className="relative w-full max-w-lg bg-white rounded-lg shadow-2xl overflow-hidden"
			>
				<div className="absolute inset-0 bg-pink-200 opacity-20 filter blur-xl"></div>
				<div className="relative z-10 p-6 sm:p-8">
					<div className="text-center">
						<Heart className="w-16 h-16 sm:w-20 sm:h-20 mx-auto text-red-500 animate-heartbeat" />
						<h1 className="mt-4 sm:mt-6 text-2xl sm:text-3xl font-bold text-gray-800 font-serif">
							Will you be my Valentine?
						</h1>
						<p className="mt-2 text-lg sm:text-xl text-gray-600 font-serif">
							- Mokie
						</p>
						{!showMessage ? (
							<div className="mt-6 sm:mt-8 space-y-4">
								<div className="flex justify-center space-x-4">
									<button
										ref={yesButtonRef}
										onClick={handleYesClick}
										className="px-6 py-3 text-base sm:text-lg font-semibold text-gray-500 transition-all duration-300 bg-white border border-gray-300 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50 transform hover:scale-105"
									>
										Yes, I&apos;d love to! ❤️
									</button>
									<button
										id="noButton"
										onMouseEnter={moveButton}
										onClick={moveButton}
										className="px-6 py-3 text-base sm:text-lg font-semibold text-white transition-all duration-300 bg-red-500 rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transform hover:scale-105 shadow-lg"
									>
										No, thanks
									</button>
								</div>
								<p className="text-lg text-red-600  italic">
									Psst! Click the &quot;No&quot; Please! 😉
								</p>
							</div>
						) : (
							<div className="mt-6 sm:mt-8 text-xl sm:text-2xl text-gray-700 font-serif animate-fadeIn">
								You&apos;ve made Mokie the happiest person! He loves you more
								than words can express. ❤️
							</div>
						)}
					</div>
				</div>
			</div>
			{showConfetti && (
				<Confetti
					width={window.innerWidth}
					height={window.innerHeight}
					recycle={false}
					numberOfPieces={200}
					drawShape={drawHeart}
					colors={["#FF69B4", "#FF1493", "#FF6347", "#FFB6C1", "#FFC0CB"]}
				/>
			)}
			<div className="fixed inset-0 pointer-events-none">
				{[...Array(isMobile ? 10 : 20)].map((_, index) => (
					<Heart
						key={index}
						className="absolute text-pink-200 animate-float"
						style={{
							left: `${Math.random() * 100}vw`,
							top: `${Math.random() * 100}vh`,
							fontSize: `${Math.random() * 16 + 8}px`,
							animationDuration: `${Math.random() * 10 + 10}s`,
							animationDelay: `${Math.random() * 5}s`,
						}}
					/>
				))}
			</div>
		</div>
	);
}
