import { FileQuestion, Lightbulb, CheckCircle } from 'lucide-react';

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Confused by Official Documents?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            We help you understand what they mean, what you need to do, and when you need to do it.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                  <FileQuestion className="w-6 h-6 text-red-600" />
                </div>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">The Problem</h3>
              <p className="text-sm text-gray-600">
                Official letters, emails, and notices are often confusing, especially for newcomers and students. Missing deadlines or requirements can have serious consequences.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <Lightbulb className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Our Solution</h3>
              <p className="text-sm text-gray-600">
                ClearPath AI analyzes your documents and provides plain-language summaries, deadlines, action items, and even draft replies—all in seconds.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">The Result</h3>
              <p className="text-sm text-gray-600">
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
