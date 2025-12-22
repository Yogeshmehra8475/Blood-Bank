
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Footer = () => {
	const year = new Date().getFullYear()

	return (
		<footer className="bg-slate-900 text-slate-200">
			<div className="grid grid-cols-1 gap-8 px-6 py-12 mx-auto max-w-7xl md:grid-cols-3">
				<div className="space-y-4">
					<Link href="/">
						<div className="flex items-center gap-3 cursor-pointer">
							<Image src="/Blood.png" alt="logo" width={100} height={40} priority />
						</div>
					</Link>
					<p className="max-w-sm text-slate-300">
						रक्त is a community-driven blood donation platform connecting donors and recipients. We make it
						simple to find help nearby and support life-saving donations.
					</p>
				</div>

				<div className="flex justify-between md:justify-center">
					<div>
						<h4 className="mb-3 font-semibold text-slate-100">Explore</h4>
						<ul className="space-y-2 text-sm text-slate-300">
							<li>
								<Link href="/" className="hover:text-white">Home</Link>
							</li>
							<li>
								<Link href="/about" className="hover:text-white">About</Link>
							</li>
							<li>
								<Link href="/donate" className="hover:text-white">Donate</Link>
							</li>
							<li>
								<Link href="/find-donor" className="hover:text-white">Find Donor</Link>
							</li>
						</ul>
					</div>

					<div>
						<h4 className="mb-3 font-semibold text-slate-100">Resources</h4>
						<ul className="space-y-2 text-sm text-slate-300">
							<li>
								<Link href="/dashboard" className="hover:text-white">Dashboard</Link>
							</li>
							<li>
								<Link href="/contact" className="hover:text-white">Contact</Link>
							</li>
							<li>
								<Link href="/privacy" className="hover:text-white">Privacy</Link>
							</li>
						</ul>
					</div>
				</div>

				<div className="space-y-4">
					<h4 className="font-semibold text-slate-100">Contact</h4>
					<p className="text-sm text-slate-300">Email: <a href="mailto:help@blood.example" className="hover:text-white">help@blood.example</a></p>
					<p className="text-sm text-slate-300">Phone: <a href="tel:+1234567890" className="hover:text-white">+1 (234) 567-890</a></p>

					<div className="flex items-center gap-4 mt-3">
						<a href="#" aria-label="Twitter" className="text-slate-300 hover:text-white">
							<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
								<path d="M22 5.92c-.63.28-1.3.47-2 .55a3.48 3.48 0 0 0 1.53-1.92 6.93 6.93 0 0 1-2.2.84 3.47 3.47 0 0 0-5.92 3.16A9.85 9.85 0 0 1 3.1 4.9a3.47 3.47 0 0 0 1.07 4.63 3.4 3.4 0 0 1-1.57-.43v.04a3.47 3.47 0 0 0 2.78 3.4c-.38.1-.78.15-1.19.15-.29 0-.57-.03-.84-.08a3.48 3.48 0 0 0 3.24 2.41A6.95 6.95 0 0 1 2 18.57a9.82 9.82 0 0 0 5.32 1.56c6.38 0 9.87-5.28 9.87-9.86v-.45A7.03 7.03 0 0 0 22 5.92z" />
							</svg>
						</a>
						<a href="#" aria-label="Facebook" className="text-slate-300 hover:text-white">
							<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
								<path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2.2v-2.9h2.2V9.1c0-2.2 1.3-3.4 3.3-3.4.96 0 1.97.17 1.97.17v2.2h-1.12c-1.1 0-1.44.68-1.44 1.38v1.66h2.46l-.39 2.9h-2.07v7A10 10 0 0 0 22 12" />
							</svg>
						</a>
						<a href="#" aria-label="Instagram" className="text-slate-300 hover:text-white">
							<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
								<path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 5.9a4.1 4.1 0 1 0 0 8.2 4.1 4.1 0 0 0 0-8.2zm6.4-1.6a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4zM12 8.6a3.4 3.4 0 1 1 0 6.8 3.4 3.4 0 0 1 0-6.8z" />
							</svg>
						</a>
					</div>
				</div>
			</div>

			<div className="border-t border-slate-800">
				<div className="flex flex-col items-center justify-between px-6 py-4 mx-auto text-sm max-w-7xl md:flex-row text-slate-400">
					<p>© {year} रक्त — All rights reserved.</p>
					<div className="mt-2 space-x-4 md:mt-0">
						<Link href="/terms" className="hover:text-white">Terms</Link>
						<Link href="/privacy" className="hover:text-white">Privacy</Link>
						<Link href="/sitemap.xml" className="hover:text-white">Sitemap</Link>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer

