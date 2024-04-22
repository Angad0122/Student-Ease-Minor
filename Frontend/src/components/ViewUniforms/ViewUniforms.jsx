import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ViewUniforms.css'
import { transformImagePath } from '../../utils';
import OnUniformopen from '../Onproductopen/OnUniformopen';

function ViewUniforms() {
    const [uniforms, setUniforms] = useState([]);
    const [selectedUniform, setSelectedUniform] = useState(null);

    useEffect(() => {
        async function fetchUniforms() {
            try {
                const response = await axios.get('http://localhost:8000/viewuniforms');
                setUniforms(response.data.uniforms);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        }

        fetchUniforms();
    }, []);


    function openproduct(uniform) {
        setSelectedUniform(uniform);
    }

    return (
        <>
            {selectedUniform ? (
                <>
                <OnUniformopen product={selectedUniform} />
                </>
            ) : (
                <>
                {uniforms.length > 0 ? (
                    <div className='bg-black'>
                            <div className="bg-white">
                                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                                    <h2 className="sr-only">Uniforms</h2>

                                    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                                        {uniforms.map((uniform) => (
                                            <button onClick={() => openproduct(uniform)} className='singleuniform bg-gray-400 p-2 border-radius-5px' key={uniform._id}>
                                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">

                                                    <img
                                                        src={transformImagePath(uniform.image)}
                                                        alt={uniform.organization}
                                                        className="h-full w-full object-cover object-center group-hover:opacity-75"
                                                    />
                                                </div>
                                                <h3 className="mt-4 text-sm text-gray-700">{uniform.organization}</h3>
                                                <h3 className="mt-1 text-sm text-gray-700">{uniform.type}</h3>
                                                <p className="mt-1 text-lg font-medium text-gray-900">{uniform.price}</p>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div id='nothingtosee'>
                            <h1>
                                No Uniforms available.
                            </h1>
                        </div>
                    )
                }
                </>
            )}

        </>
    );
}

export default ViewUniforms
