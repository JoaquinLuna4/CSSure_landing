"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Zap, Smartphone, Clock } from "lucide-react";
import { TermsModal } from "@/components/TermsModal";

export default function HomePage() {
	const [isTermsChecked, setIsTermsChecked] = useState(false);
	const [isTermsOpen, setIsTermsOpen] = useState(false);
	const [email, setEmail] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [error, setError] = useState('');

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!isTermsChecked || !email) return;

		setIsSubmitting(true);
		setError('');

		try {
			const response = await fetch('https://formspree.io/f/xeolqgla', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email }),
			});

			if (response.ok) {
				setIsSubmitted(true);
				setEmail('');
				setIsTermsChecked(false);
			} else {
				throw new Error('Failed to submit form');
			}
		} catch (err) {
			setError('Failed to submit. Please try again.');
		} finally {
			setIsSubmitting(false);
		}
	};
	return (
		<div className="min-h-screen" style={{ backgroundColor: "#21323B" }}>
			{/* Hero Section */}
			<section className="px-4 py-16 md:py-24">
				<div className="max-w-4xl mx-auto text-center">
					<h1
						className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
						style={{ color: "#F4F4F9" }}
					>
						Tired of your emails breaking in Outlook and on mobile devices?{" "}
						<span style={{ color: "#B8DBD9" }}>We have the solution.</span>
					</h1>

					<p
						className="text-xl md:text-2xl mb-12 leading-relaxed max-w-3xl mx-auto"
						style={{ color: "#F4F4F9" }}
					>
						A simple and accessible tool to validate and clean your HTML code,
						guaranteeing that your emails look perfect on all clients.
					</p>

					{/* Waitlist Form */}
					<div className="max-w-md mx-auto">
						<form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
							<Input
								type="email"
								placeholder="Your email address"
								className="flex-1 h-12 text-lg border-2"
								style={{ borderColor: "#B8DBD9", backgroundColor: "white" }}
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
								disabled={isSubmitting || isSubmitted}
							/>
							<Button
								type="submit"
								size="lg"
								className="h-12 px-8 text-lg font-semibold hover:opacity-90 transition-opacity"
								style={{
									backgroundColor: isTermsChecked && !isSubmitted ? "#B8DBD9" : "#586F7C",
									color: "#21323B",
									cursor: isTermsChecked && !isSubmitted && !isSubmitting ? "pointer" : "not-allowed",
									opacity: isTermsChecked && !isSubmitted ? 1 : 0.7,
								}}
								disabled={!isTermsChecked || isSubmitting || isSubmitted}
							>
								{isSubmitting ? 'Submitting...' : isSubmitted ? 'Thank you!' : 'Join Waitlist'}
							</Button>
						</form>
						<div className="mt-4 flex items-start">
							<input
								type="checkbox"
								id="terms"
								checked={isTermsChecked}
								onChange={(e) => setIsTermsChecked(e.target.checked)}
								className="mt-1 mr-2"
								disabled={isSubmitting || isSubmitted}
							/>
							<label htmlFor="terms" className="text-sm text-gray-300">
								I agree to the{" "}
								<button
									type="button"
									onClick={() => setIsTermsOpen(true)}
									className="text-blue-300 hover:underline"
									disabled={isSubmitting || isSubmitted}
								>
									Terms & Privacy Policy
								</button>
							</label>
						</div>
						{error && <p className="text-sm text-red-400 mt-2">{error}</p>}
						{isSubmitted ? (
							<p className="text-sm text-green-400 mt-2">
								Thank you for joining our waitlist! We'll be in touch soon.
							</p>
						) : (
							<p className="text-xs text-gray-400 mt-3">
								No spam, ever. We'll only send you relevant updates.
							</p>
						)}
					</div>
				</div>
			</section>
			{/* Image Comparison Section */}
			<section className="px-4 py-12 bg-white">
				<div className="max-w-6xl mx-auto">
					<p
						className="text-3xl md:text-4xl font-bold text-center mb-12"
						style={{ color: "#21323B" }}
					>
						How does it work?
					</p>
					<div className="grid md:grid-cols-2 gap-8 items-center">
						<div className="text-center">
							<h3
								className="text-xl font-semibold mb-4"
								style={{ color: "#21323B" }}
							>
								Without CSSure
							</h3>
							<img
								src="/preview_novalidate.png"
								alt="Email without validation"
								className="mx-auto rounded-lg shadow-lg border-2 border-gray-200"
							/>
						</div>
						<div className="text-center">
							<h3
								className="text-xl font-semibold mb-4"
								style={{ color: "#21323B" }}
							>
								With CSSure
							</h3>
							<img
								src="/preview_validate.png"
								alt="Email with validation"
								className="mx-auto rounded-lg shadow-lg border-2 border-gray-200"
							/>
						</div>
					</div>
					<p className="text-xs text-center mt-4 text-gray-500">
						* Illustrative images showing the difference CSSure can make
					</p>
					<div className="text-center">
						<p
							className="text-xl md:text-2xl font-medium leading-relaxed"
							style={{ color: "#21323B" }}
						>
							Simply paste your HTML code on the left...{" "}
							<span
								style={{ color: "#rgb(2 38 57)" }}
								className="font-semibold"
							>
								and receive your validated code report.
							</span>
						</p>
					</div>
				</div>
			</section>
			{/* Features Section */}
			<section className="px-4 py-16">
				<div className="max-w-6xl mx-auto">
					<h2
						className="text-3xl md:text-4xl font-bold text-center mb-12"
						style={{ color: "#F4F4F9" }}
					>
						Why choose CSSure?
					</h2>

					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
						<Card
							className="border-2 hover:shadow-lg transition-shadow"
							style={{ borderColor: "#B8DBD9", backgroundColor: "white" }}
						>
							<CardContent className="p-6 text-center">
								<div
									className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center"
									style={{ backgroundColor: "#B8DBD9" }}
								>
									<Clock className="w-6 h-6" style={{ color: "#586F7C" }} />
								</div>
								<h3
									className="text-xl font-bold mb-3"
									style={{ color: "#586F7C" }}
								>
									Save time
								</h3>
								<p style={{ color: "#586F7C" }}>
									Automatically detect and fix HTML errors, reducing hours of
									manual debugging.
								</p>
							</CardContent>
						</Card>

						<Card
							className="border-2 hover:shadow-lg transition-shadow"
							style={{ borderColor: "#B8DBD9", backgroundColor: "white" }}
						>
							<CardContent className="p-6 text-center">
								<div
									className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center"
									style={{ backgroundColor: "#B8DBD9" }}
								>
									<Smartphone
										className="w-6 h-6"
										style={{ color: "#586F7C" }}
									/>
								</div>
								<h3
									className="text-xl font-bold mb-3"
									style={{ color: "#586F7C" }}
								>
									Perfect design on all devices
								</h3>
								<p style={{ color: "#586F7C" }}>
									Ensure your emails look amazing on mobile, tablet, and
									desktop.
								</p>
							</CardContent>
						</Card>

						<Card
							className="border-2 hover:shadow-lg transition-shadow"
							style={{ borderColor: "#B8DBD9", backgroundColor: "white" }}
						>
							<CardContent className="p-6 text-center">
								<div
									className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center"
									style={{ backgroundColor: "#B8DBD9" }}
								>
									<Zap className="w-6 h-6" style={{ color: "#586F7C" }} />
								</div>
								<h3
									className="text-xl font-bold mb-3"
									style={{ color: "#586F7C" }}
								>
									Simple and accessible
								</h3>
								<p style={{ color: "#586F7C" }}>
									Intuitive interface that doesn't require advanced technical
									knowledge.
								</p>
							</CardContent>
						</Card>

						<Card
							className="border-2 hover:shadow-lg transition-shadow"
							style={{ borderColor: "#B8DBD9", backgroundColor: "white" }}
						>
							<CardContent className="p-6 text-center">
								<div
									className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center"
									style={{ backgroundColor: "#B8DBD9" }}
								>
									<CheckCircle
										className="w-6 h-6"
										style={{ color: "#586F7C" }}
									/>
								</div>
								<h3
									className="text-xl font-bold mb-3"
									style={{ color: "#586F7C" }}
								>
									Guaranteed compatibility
								</h3>
								<p style={{ color: "#586F7C" }}>
									Automatically test against Outlook, Gmail, Apple Mail, and
									more.
								</p>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			{/* About Us Section */}
			<section className="px-4 py-16">
				<div className="max-w-4xl mx-auto">
					<h2
						className="text-3xl md:text-4xl font-bold text-center mb-12"
						style={{ color: "#F4F4F9" }}
					>
						Who we are
					</h2>

					<div className="grid md:grid-cols-2 gap-8">
						<Card
							className="border-2"
							style={{ borderColor: "#B8DBD9", backgroundColor: "white" }}
						>
							<CardContent className="p-8 text-center">
								<div
									className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center text-2xl font-bold text-white"
									style={{ backgroundColor: "#F4F4F9" }}
								>
									<img
										src="https://ui-avatars.com/api/?name=Ana+Martinez&background=586F7C&color=fff&size=80"
										alt="Ana Martínez"
										className="w-full h-full object-cover rounded-full"
									/>
								</div>

								<h3
									className="text-2xl font-bold mb-4"
									style={{ color: "#586F7C" }}
								>
									Gaston Arevalo
								</h3>
								<p className="leading-relaxed" style={{ color: "#586F7C" }}>
									With more than 8 years of experience in software development
									and a deep specialization in product architecture, Gastón is
									the technical brain of CSSure. His extensive experience in the
									industry has given him the necessary vision to build a robust
									and scalable tool that not only solves the current problem,
									also is ready for the future.
								</p>
							</CardContent>
						</Card>

						<Card
							className="border-2"
							style={{ borderColor: "#B8DBD9", backgroundColor: "white" }}
						>
							<CardContent className="p-8 text-center">
								<div
									className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center text-2xl font-bold text-white"
									style={{ backgroundColor: "#F4F4F9" }}
								>
									<img
										src="https://ui-avatars.com/api/?name=Carlos+Garcia&background=586F7C&color=fff&size=80"
										alt="Carlos Garcia"
										className="w-full h-full object-cover rounded-full"
									/>
								</div>
								<h3
									className="text-2xl font-bold mb-4"
									style={{ color: "#586F7C" }}
								>
									Joaquin Luna
								</h3>
								<p className="leading-relaxed" style={{ color: "#586F7C" }}>
									As a software developer with a passion for design, Joaquín
									focuses on translating technical complexity into a fluid and
									intuitive user experience. His mission is to ensure that
									CSSure not only works flawlessly but is also incredibly easy
									and enjoyable to use. His agile approach and knack for
									combining aesthetics with functionality are key to bringing
									the product vision to life.
								</p>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>
			{/* Final CTA Section */}
			<section className="py-20 px-4" style={{ backgroundColor: "#21323B" }}>
				<div className="max-w-4xl mx-auto text-center">
					<h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
						Join the Waitlist for Exclusive Early Access
					</h2>
					<div className="max-w-2xl mx-auto mb-8">
						<p className="text-xl mb-4 text-gray-200">
							By joining our waitlist, you secure{" "}
							<span className="font-bold text-white">
								100% lifetime discount
							</span>{" "}
							on our validation service
						</p>
						<p className="text-gray-300">
							CSSure is currently in development. By joining our waitlist, not
							only do you secure this exclusive benefit but also help us build
							the perfect product for your needs.
						</p>
					</div>
					<div className="max-w-md mx-auto">
						<form className="flex flex-col sm:flex-row gap-3">
							<Input
								type="email"
								placeholder="Your email address"
								className="flex-1 h-12 text-lg border-2"
								style={{ borderColor: "#B8DBD9", backgroundColor: "white" }}
							/>
							<Button
								type="submit"
								size="lg"
								className="h-12 px-8 text-lg font-semibold hover:opacity-90 transition-opacity"
								style={{
									backgroundColor: isTermsChecked ? "#B8DBD9" : "#586F7C",
									color: "#21323B",
									cursor: isTermsChecked ? "pointer" : "not-allowed",
									opacity: isTermsChecked ? 1 : 0.7,
								}}
								disabled={!isTermsChecked}
							>
								Join Waitlist
							</Button>
						</form>
						<div className="mt-4 flex items-start">
							<input
								type="checkbox"
								id="terms"
								checked={isTermsChecked}
								onChange={(e) => setIsTermsChecked(e.target.checked)}
								className="mt-1 mr-2"
							/>
							<label htmlFor="terms" className="text-sm text-gray-300">
								I agree to the{" "}
								<button
									type="button"
									onClick={() => setIsTermsOpen(true)}
									className="text-blue-300 hover:underline"
								>
									Terms & Privacy Policy
								</button>
							</label>
						</div>
						<p className="text-xs text-gray-400 mt-3">
							No spam, ever. We'll only send you relevant updates.
						</p>
					</div>
				</div>
			</section>
			{/* Footer */}
			<footer
				className="px-4 py-8 border-t-2"
				style={{ borderColor: "#B8DBD9" }}
			>
				<div className="max-w-4xl mx-auto text-center">
					<div className="flex flex-col md:flex-row justify-center items-center gap-4">
						<p style={{ color: "#586F7C" }}>
							2025 CSSure. All rights reserved.
						</p>
						<div className="flex gap-4">
							<button
								onClick={() => setIsTermsOpen(true)}
								className="text-sm text-[#586F7C] hover:underline"
							>
								Terms & Privacy
							</button>
						</div>
					</div>
				</div>
			</footer>

			{/* Terms Modal */}
			{isTermsOpen && (
				<TermsModal
					isOpen={isTermsOpen}
					onClose={() => setIsTermsOpen(false)}
				/>
			)}
		</div>
	);
}
