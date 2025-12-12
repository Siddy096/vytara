import { X, Upload, FileText } from 'lucide-react';
import { Appointment, Document } from '../App';

type Props = {
  appointment: Appointment;
  documents: Document[];
  onClose: () => void;
  onAddDocument: () => void;
};

export function VisitInfoModal({ appointment, documents, onClose, onAddDocument }: Props) {
  const visitDocuments = documents.filter(doc => doc.recentVisit === appointment.title);

  // helper to prettify type text
  const prettyType = appointment.type
    ? appointment.type.replace('/', ' / ').split(' ')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    : 'Not specified';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header - Only title (no fetched data) */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Visit Information</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-col max-h-[calc(90vh-80px)] overflow-y-auto">
          {/* Top Section - Visit Details */}
          <div className="p-6 border-b border-gray-200">
            {/* Event Type - orange capsule above date */}
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-[#FF8000] text-white rounded-full text-sm font-semibold">
                {prettyType}
              </span>
            </div>

            <div className="flex items-start gap-8">
              {/* Date Square - teal rounded square with white text */}
              <div className="w-24 h-24 rounded-xl bg-[#309898] flex flex-col items-center justify-center text-white shrink-0">
                <span className="text-3xl font-bold leading-none">{new Date(appointment.date).getDate()}</span>
                <span className="text-sm font-bold uppercase">{new Date(appointment.date).toLocaleString('default', { month: 'short' })}</span>
              </div>

              {/* Textual Content */}
              <div className="flex-1 space-y-4">
                {/* Title / details (kept for context) */}
                <div>
                  {appointment.title && <p className="font-bold text-gray-800 text-xl">{appointment.title}</p>}
                  {(appointment.doctor || appointment.facility) && (
                    <p className="text-gray-600 mt-1">
                      {appointment.doctor}{appointment.doctor && appointment.facility ? ' • ' : ''}{appointment.facility}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-6">
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-semibold text-gray-800">
                      {new Date(appointment.date).toLocaleDateString()}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Time</p>
                    <p className="font-semibold text-gray-800">{appointment.time}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Documents Section */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800">Documents ({visitDocuments.length})</h3>
              {/* kept intentionally empty per your request (no additional upload here) */}
            </div>

            {visitDocuments.length > 0 ? (
              // When there are documents: show grid of docs, and the upload square as the last item (on the right)
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {visitDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:bg-gray-100 transition cursor-pointer aspect-square flex flex-col"
                  >
                    <div className="flex-1 bg-white border border-gray-300 rounded-lg flex items-center justify-center mb-3 w-full h-full">
                      <FileText className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="font-bold text-gray-800 text-sm truncate">{doc.name}</p>
                    <p className="text-xs text-gray-500 capitalize">{doc.category.replace('-', ' ')}</p>
                  </div>
                ))}

                {/* Upload square as last grid item */}
                <button
                  onClick={onAddDocument}
                  className="w-full aspect-square border-2 border-dashed border-[#FF8000] rounded-lg flex flex-col items-center justify-center text-[#FF8000] hover:bg-[#FF8000]/10 transition cursor-pointer"
                  aria-label="Upload document"
                >
                  <Upload className="w-8 h-8 mb-2" />
                  <p className="text-sm font-medium">Add Document</p>
                </button>
              </div>
            ) : (
              // No documents: show the upload square in a grid to match document dimensions
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <button
                  onClick={onAddDocument}
                  className="w-full aspect-square border-2 border-dashed border-[#FF8000] rounded-lg flex flex-col items-center justify-center text-[#FF8000] hover:bg-[#FF8000]/10 transition cursor-pointer"
                  aria-label="Upload document"
                >
                  <Upload className="w-8 h-8 mb-2" />
                  <p className="text-sm font-medium">Add Document</p>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
