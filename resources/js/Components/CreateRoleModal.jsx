import { useForm } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import axios from 'axios';

const CreateRoleModal = ({ show, onHide, storeRole }) => {
    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        name: '',
        permissions: [],
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await storeRole(data);
            onHide();
        } catch (error) {
            console.error('Error al crear el rol:', error);
        }
    };

    return (
        <Modal show={show} title="Crear Rol" onClose={onHide} maxWidth="7xl">
            <form onSubmit={handleSubmit} className="p-6 dark:text-slate-200">
                <div className="mb-4 w-full sm:w-1/2 mx-auto text-center">
                    <label htmlFor="name" className="text-xl">Nombre del Rol</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Ingrese el nombre del rol"
                        className="bg-white w-full dark:bg-slate-800/50  dark:border-slate-700 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                    />
                    {errors.name && <div className="text-red-500 text-xs mt-1">{errors.name}</div>}
                </div>
                <div className="mb-4 overflow-auto p-2 rounded-xl">
                    {/* Aquí puedes iterar sobre los permisos y agruparlos como en el componente principal */}
                </div>
                <div className="flex justify-between space-x-4 border-t-2 border-dashed border-slate-600 pt-4">
                    <button
                        type="button"
                        className="bg-slate-500 hover:bg-slate-600 text-white px-4 py-2 rounded-xl w-full transition-colors ease-in-out"
                        onClick={onHide}
                    >Cancelar</button>
                    <button
                        type="submit"
                        className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl w-full transition-colors ease-in-out"
                        disabled={processing}
                    >
                        {processing ? 'Guardando...' : 'Guardar'}
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default CreateRoleModal;
