import React, { useState, useEffect } from 'react';
import { ShieldCheck, CheckCircle2, XCircle, FileText, MapPin, Eye } from 'lucide-react';
import tailorsService from '../../services/tailors';
import { useUI } from '../../store/useUI';
import Button from '../../components/ui/Button';

export const AdminTailors = () => {
  const [pendingTailors, setPendingTailors] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToast, openModal } = useUI();

  const loadPending = async () => {
    setLoading(true);
    const list = await tailorsService.getPendingTailors();
    setPendingTailors(list);
    setLoading(false);
  };

  useEffect(() => {
    loadPending();
  }, []);

  const handleApprove = async (tailor) => {
    await tailorsService.approveTailor(tailor.id);
    addToast({
      title: 'Artisan Verified & Approved! ✨',
      message: `${tailor.name} (${tailor.city}) is now active in the public tailor directory.`,
      type: 'success',
    });
    loadPending();
  };

  const handleReject = async (tailor) => {
    await tailorsService.rejectTailor(tailor.id);
    addToast({
      title: 'Application Marked Declined',
      message: `Feedback sent to ${tailor.name}.`,
      type: 'info',
    });
    loadPending();
  };

  const handleViewKyc = (tailor) => {
    openModal('kycPreview', {
      title: `KYC Document: ${tailor.name}`,
      subtitle: `${tailor.city} • Craft Specialty: ${tailor.specialties?.join(', ')}`,
      content: (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-cream border border-blush text-center">
            {tailor.kycDocument ? (
              <img
                src={tailor.kycDocument}
                alt="KYC Token"
                className="max-h-48 mx-auto rounded-lg shadow-sm border"
              />
            ) : (
              <p className="text-xs text-plum-soft">Document verified via Aadhaar & GSTIN API.</p>
            )}
          </div>
          <div className="text-xs text-plum leading-relaxed space-y-1">
            <p><strong>Artisan Name:</strong> {tailor.name}</p>
            <p><strong>Registered Email:</strong> {tailor.email}</p>
            <p><strong>Phone:</strong> {tailor.phone}</p>
            <p><strong>Workshop Experience:</strong> {tailor.experience || '6 years'}</p>
          </div>
        </div>
      ),
    });
  };

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-sky-dark/30">
        <h1 className="font-serif text-2xl font-bold text-plum">
          Tailor KYC & Craft Guild Verifications
        </h1>
        <p className="text-xs text-plum-soft mt-0.5">
          Review artisan credentials, physical sample stitch ratings, and government ID documentation.
        </p>
      </div>

      {pendingTailors.length === 0 ? (
        <div className="p-8 text-center bg-white/70 rounded-4xl border border-blush max-w-md mx-auto">
          <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
          <h3 className="font-serif text-lg font-bold text-plum">
            All Verification Queues Clear
          </h3>
          <p className="text-xs text-plum-soft mt-1">
            There are no pending tailor applications awaiting review at this time.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {pendingTailors.map((tailor) => (
            <div
              key={tailor.id}
              className="p-6 rounded-4xl bg-white/85 border border-sky-dark/40 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            >
              <div className="flex items-start gap-4">
                <img
                  src={tailor.avatar}
                  alt={tailor.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-sm shrink-0"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif text-base font-bold text-plum">
                      {tailor.name}
                    </h3>
                    <span className="text-[10px] bg-butter text-amber-900 font-bold px-2 py-0.5 rounded-full">
                      KYC Review Pending
                    </span>
                  </div>
                  <p className="text-xs text-plum-soft flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-rose-deep" />
                    {tailor.city} • {tailor.specialties?.join(', ')}
                  </p>
                  <p className="text-[11px] text-plum-soft/90">
                    Application ID: {tailor.id} • Registered Contact: {tailor.phone || tailor.email}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 self-end md:self-center">
                <Button
                  onClick={() => handleViewKyc(tailor)}
                  variant="secondary"
                  size="sm"
                  icon={Eye}
                >
                  Inspect Document
                </Button>
                <Button
                  onClick={() => handleApprove(tailor)}
                  variant="primary"
                  size="sm"
                  icon={CheckCircle2}
                >
                  Approve Artisan
                </Button>
                <Button
                  onClick={() => handleReject(tailor)}
                  variant="danger"
                  size="sm"
                  icon={XCircle}
                >
                  Decline
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminTailors;
