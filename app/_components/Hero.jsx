import Link from 'next/link'
import React from 'react'

const Hero = () => {
    return (
        <div>
            <section
                className="relative bg-[url(/BloodBg.png)] bg-cover bg-center bg-no-repeat"
            >
                <div
                    className="absolute inset-0 bg-gray-900/75 lg:bg-transparent lg:from-gray-900/95 md:to-gray-900/25 ltr:md:bg-gradient-to-r rtl:md:bg-gradient-to-l"
                ></div>

                <div
                    className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:justify-end h-screen lg:items-center lg:px-8"
                >
                    <div className="max-w-xl max-lg:mx-auto text-center ltr:sm:text-left rtl:sm:text-right">
                        <h1 className="text-3xl font-extrabold sm:text-stone-400 md:text-slate-500 sm:text-5xl">
                            Let help everyone and

                            <strong className="block font-extrabold text-rose-500"> Save Lives </strong>
                        </h1>

                        <p className="mt-4 max-w-lg md:text-slate-500 font-bold sm:text-xl/relaxed">
                            Lets take a step and try to become a potential doner and save lives.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-4 text-center">
                            <Link
                                href="/dashboard"
                                className="block w-full rounded bg-rose-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-rose-700 focus:outline-none focus:ring active:bg-rose-500 lg:w-auto"
                            >
                                Get Started
                            </Link>

                            <Link
                                href="#"
                                className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-rose-600 shadow hover:text-rose-700 focus:outline-none focus:ring active:text-rose-500 lg:w-auto"
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