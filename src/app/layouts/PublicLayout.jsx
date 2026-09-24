import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import ToastContainer from '../../components/ui/Toast';
import Modal from '../../components/ui/Modal';
import Drawer from '../../components/ui/Drawer';
import { useUI } from '../../store/useUI';

export const PublicLayout = () => {
  const { modal, closeModal, drawer, closeDrawer } = useUI();

  return (
    <div className="min-h-screen flex flex-col bg-cream text-plum selection:bg-blush selection:text-plum overflow-x-hidden">
      {/* Sticky Glass Navbar */}
      <Navbar />

      {/* Main Page View with Page Transition */}
      <main className="flex-1 w-full">
        <Outlet />
      </main>

      {/* Atelier Footer */}
      <Footer />

      {/* Global Toast System */}
      <ToastContainer />

      {/* Global Modal Renderer */}
      {modal && (
        <Modal
          isOpen={!!modal}
          onClose={closeModal}
          title={modal.data?.title}
          subtitle={modal.data?.subtitle}
          maxWidth={modal.data?.maxWidth || 'max-w-xl'}
        >
          {modal.data?.content}
        </Modal>
      )}

      {/* Global Drawer Renderer */}
      {drawer && (
        <Drawer
          isOpen={!!drawer}
          onClose={closeDrawer}
          title={drawer.title}
          subtitle={drawer.subtitle}
          width={drawer.width || 'max-w-md'}
        >
          {drawer.content}
        </Drawer>
      )}
    </div>
  );
};

export default PublicLayout;
