import { ArrowBigUpDashIcon as ArrowPathIcon, CloudCogIcon as CloudArrowUpIcon, LockIcon as LockClosedIcon } from 'lucide-react';


export default function MainPage() {
    return (
        <div className="bg-gray-900 py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <h2 className="text-base font-semibold leading-7 text-indigo-400">SuperCharge Productivity</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        Seamless Communication Solutions
                    </p>
                    <p className="mt-6 text-lg leading-8 text-gray-300">
                        Experience enhanced real-time communication with our intuitive login and signup process. Explore all spaces, recordings, metrics, and participant information with ease. Stay informed with recording summaries and leverage our reliable and secure platform tailored to your specific needs.
                    </p>
                </div>
                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                        <div className="flex flex-col">
                            <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                                <CloudArrowUpIcon className="h-5 w-5 flex-none text-indigo-400" aria-hidden="true" />
                                Seamless Experience
                            </dt>
                            <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-300">
                                <div className="flex-auto">
                                    <ul className='space-y-4'>
                                        <li className="border-b border-gray-200 py-4"><b>Robust Support Features:</b> Enhances real-time communication experience with user-friendly login and signup options.</li>
                                        <li><b>Comprehensive Views:</b> Provides complete visibility into spaces, recordings, metrics, participants, and recording summaries.</li>
                                        <li><b>Streamlined Workflows:</b> Simplifies communication management with features designed to improve productivity and collaboration.</li>
                                        <li><b>Bandwidth Cost Reduction:</b> Utilizes DePIN technology to reduce bandwidth expenses by up to 90% compared to traditional cloud providers.</li>
                                        <li><b>People-Powered Network:</b> Leverages users' home broadband connections for exceptional video and audio quality while minimizing financial burden.</li>
                                    </ul>
                                </div>
                            </dd>
                        </div>

                        <div className="flex flex-col">
                            <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                                <LockClosedIcon className="h-5 w-5 flex-none text-indigo-400" aria-hidden="true" />
                                Why Choose Genple?
                            </dt>
                            <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-300">
                                <div className="flex-auto">
                                    <ul className='space-y-4'>
                                        <li className="border-b border-gray-200 py-4">
                                            <b>Intuitive User Interface:</b> Designed for simplicity, enabling non-technical users to navigate effortlessly.</li>
                                        <li><b>Scalability:</b> Adapts to your business growth, suitable for organizations of varying sizes.</li>
                                        <li><b>Security & Reliability:</b> Prioritized for client data protection and uninterrupted service delivery.</li>
                                        <li><b>Customization:</b> Flexible options to tailor our platform according to individual needs.</li>
                                    </ul>
                                </div>
                            </dd>
                        </div>

                        <div className="flex flex-col">
                            <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                                <ArrowPathIcon className="h-5 w-5 flex-none text-indigo-400" aria-hidden="true" />
                                Built on top of Huddle01
                            </dt>
                            <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-300">
                                <div className="flex-auto">
                                    <ul className='space-y-4'>
                                        <li className="border-b border-gray-200 py-4">Huddle01 introduces DePIN technology for real-time communication.</li>
                                        <li>DePIN harnesses the power of people-powered networks for crystal-clear audio and video calls.</li>
                                        <li>Reduces bandwidth expenses by 90% compared to traditional cloud service providers.</li>
                                        <li>Achieves savings by using participants' home internet connections.</li>
                                        <li>Product-first approach focuses on creating a user-friendly platform for real-time video and audio calls.</li>
                                        <li>Offers a powerful audio/video SDK as an alternative to Agora.</li>
                                        <li>Over 3 million meeting minutes logged by 35,000+ users.</li>
                                    </ul>
                                </div>
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    )
}
