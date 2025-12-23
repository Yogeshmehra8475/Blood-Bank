import Link from 'next/link'
import React from 'react'

const Hero = () => {
    return (
        <div>
            <section
                className="relative bg-[url(/BloodBg.png)] bg-cover bg-center bg-no-repeat"
            >
                <div
                    className="absolute inset-0 bg-gray-200/75 lg:bg-transparent lg:from-gray-200/95 md:to-gray-900/25 ltr:md:bg-gradient-to-r rtl:md:bg-gradient-to-l"
                ></div>

                <div
                    className="relative h-screen max-w-screen-xl px-4 py-32 mx-auto sm:px-6 lg:flex lg:justify-end lg:items-center lg:px-8"
                >
                    <div className="max-w-xl text-center max-lg:mx-auto ltr:sm:text-left rtl:sm:text-right">
                        <h1 className="text-3xl font-extrabold sm:text-stone-400 md:text-slate-500 sm:text-5xl">
                            Let help everyone and

                            <strong className="block font-extrabold text-rose-500"> Save Lives </strong>
                        </h1>

                        <p className="max-w-lg mt-4 font-bold md:text-slate-500 sm:text-xl/relaxed">
                            Lets take a step and try to become a potential doner and save lives.
                        </p>

                        <div className="flex flex-wrap gap-4 mt-8 text-center">
                            <Link
                                href="/dashboard"
                                className="block w-full px-12 py-3 text-sm font-medium text-white rounded shadow bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring active:bg-rose-500 lg:w-auto"
                            >
                                Get Started
                            </Link>

                            <Link
                                href="#"
                                className="block w-full px-12 py-3 text-sm font-medium bg-white rounded shadow text-rose-600 hover:text-rose-700 focus:outline-none focus:ring active:text-rose-500 lg:w-auto"
                            >
                                Learn More
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Hero