import { FileQuestion, Lightbulb, CheckCircle } from 'lucide-react';

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-blue-50 via-white to-transparent py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Confused by Official Documents?
          </h2>
          <p className="text-xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto">
            We help you understand what they mean, what you need to do, and when you need to do it.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center">
                  <FileQuestion className="w-8 h-8 text-red-600" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">The Problem</h3>
              <p className="text-gray-600 leading-relaxed">
                Official letters, emails, and notices are often confusing, especially for newcomers and students. Missing deadlines or requirements can have serious consequences.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center">
                  <Lightbulb className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Our Solution</h3>
              <p className="text-gray-600 leading-relaxed">
                ClearPath AI analyzes your documents and provides plain-language summaries, deadlines, action items, and even draft replies—all in seconds.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">The Result</h3>
              <p className="text-gray-600 leading-relaxed">
                You get a clear understanding of what the document means, what you need to do, and when you need to do it—with confidence and peace of mind.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Made with Bob
