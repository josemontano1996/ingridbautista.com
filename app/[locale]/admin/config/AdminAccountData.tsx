
import { UpdatePasswordForm } from './UpdatePasswordForm';

export const AdminAccountData = async () => {
  return (
    <>
      {/*  <div className="w-[350px] rounded border border-primary px-4 py-8">
        <h2 className="mb-4 text-2xl font-semibold">Tus datos de acceso</h2>
        <AccountDataForm user={user} />
      </div> */}
      <div className="w-[350px] rounded border border-primary px-4 py-8">
        <h2 className="mb-4 text-2xl font-semibold">Actualizar contraseña</h2>
        <UpdatePasswordForm />
      </div>
    </>
  );
};
