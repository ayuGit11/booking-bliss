import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreatePackageForm from "./CreatePackageForm";
function AddPackage() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="package-form">
          <Button>Add new Package</Button>
        </Modal.Open>
        <Modal.Window name="package-form">
          <CreatePackageForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}
// function AddCabin() {
//   const [isOpenModal, setIsOpenModal] = useState(false);
//   return (
//     <div>
//       <Button onClick={() => setIsOpenModal((show) => !show)}>
//         Add new cabin
//       </Button>
//       {isOpenModal && (
//         <Modal onClose={() => setIsOpenModal(false)}>
//           <CreateCabinForm onCloseModal={() => setIsOpenModal(false)} />
//         </Modal>
//       )}
//     </div>
//   );
// }
export default AddPackage;
