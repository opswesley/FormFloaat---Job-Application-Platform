import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaLinkedin, FaGraduationCap, FaBuilding, FaCalendar, FaCode, FaPeopleArrows, FaMoneyBillWave, FaLanguage, FaFileUpload, FaCheckCircle } from 'react-icons/fa';

const schema = yup.object({
  name: yup.string().min(3, 'Mínimo de 3 caracteres').required('Nome é obrigatório'),
  email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  phone: yup
    .string()
    .matches(/^\d{10,11}$/, 'Telefone deve ter 10 ou 11 dígitos')
    .required('Telefone é obrigatório'),
  linkedin: yup
    .string()
    .url('Deve ser uma URL válida')
    .matches(/linkedin\.com/, 'Deve ser um link do LinkedIn')
    .required('LinkedIn é obrigatório'),
  educationLevel: yup.string().required('Nível de escolaridade é obrigatório'),
  course: yup.string().required('Curso é obrigatório'),
  institution: yup.string().required('Instituição é obrigatória'),
  lastCompany: yup.string().required('Última empresa é obrigatória'),
  lastPosition: yup.string().required('Último cargo é obrigatório'),
  experiencePeriod: yup.string().required('Período de experiência é obrigatório'),
  technicalSkills: yup.string().required('Habilidades técnicas são obrigatórias'),
  softSkills: yup.string().required('Habilidades comportamentais são obrigatórias'),
  salaryExpectation: yup
    .number()
    .positive('Deve ser um valor positivo')
    .required('Pretensão salarial é obrigatória'),
  languages: yup
    .array()
    .of(yup.string())
    .min(1, 'Selecione pelo menos um idioma')
    .required('Selecione pelo menos um idioma'),
  resumeLink: yup
    .string()
    .url('Deve ser uma URL válida')
    .required('Link do currículo é obrigatório'),
  terms: yup
    .boolean()
    .oneOf([true], 'Você deve aceitar os termos e condições')
    .required('Você deve aceitar os termos e condições'),
});

function Form() {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const savedSubmissions = localStorage.getItem('jobApplications');
    if (savedSubmissions) {
      setSubmissions(JSON.parse(savedSubmissions));
    }
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      languages: [],
    },
  });

  const languages = watch('languages', []);

  const handleLanguageChange = (language) => {
    const updatedLanguages = languages.includes(language)
      ? languages.filter((lang) => lang !== language)
      : [...languages, language];
    setValue('languages', updatedLanguages);
  };

  const onSubmit = (data) => {
    const newSubmission = { ...data, id: Date.now() };
    const updatedSubmissions = [...submissions, newSubmission];
    setSubmissions(updatedSubmissions);
    localStorage.setItem('jobApplications', JSON.stringify(updatedSubmissions));
    alert('Candidatura enviada com sucesso!');
    reset();
  };

  const exportSubmissions = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(submissions));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "candidaturas.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    document.body.removeChild(downloadAnchorNode);
  };

  const clearSubmissions = () => {
    setSubmissions([]);
    localStorage.removeItem('jobApplications');
    alert('Candidaturas limpas com sucesso!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100">
      {/* Cabeçalho */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-6 shadow-lg">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <h1 className="text-4xl font-extrabold tracking-tight flex items-center">
            <FaCheckCircle className="mr-2" /> FormFloaat
          </h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <a href="#form" className="hover:underline">Enviar Candidatura</a>
              </li>
              <li>
                <a href="#submissions" className="hover:underline">Ver Candidaturas</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Seção de Introdução */}
      <section className="py-12 bg-white shadow-inner">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Candidate-se a Vagas Incríveis!
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Preencha o formulário abaixo para enviar sua candidatura. Nossa plataforma conecta talentos como você a oportunidades incríveis em empresas de todo o mundo.
          </p>
        </div>
      </section>

      {/* Formulário */}
      <section id="form" className="py-12">
        <div className="container mx-auto px-4">
          <div className="bg-white p-8 rounded-xl shadow-2xl max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center flex items-center justify-center">
              <FaUser className="mr-2 text-blue-600" /> Envie sua Candidatura
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Informações Pessoais */}
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                  <FaUser className="mr-2 text-blue-600" /> Informações Pessoais
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                      Nome Completo
                    </label>
                    <div className="relative">
                      <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        id="name"
                        {...register('name')}
                        className={`w-full pl-10 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ${
                          errors.name ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                    </div>
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                      E-mail
                    </label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        id="email"
                        {...register('email')}
                        className={`w-full pl-10 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                    </div>
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                      Telefone
                    </label>
                    <div className="relative">
                      <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="tel"
                        id="phone"
                        {...register('phone')}
                        placeholder="Digite apenas números (ex.: 11987654321)"
                        className={`w-full pl-10 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ${
                          errors.phone ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                    </div>
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="linkedin" className="block text-gray-700 font-medium mb-2">
                      Perfil do LinkedIn
                    </label>
                    <div className="relative">
                      <FaLinkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="url"
                        id="linkedin"
                        {...register('linkedin')}
                        placeholder="https://linkedin.com/in/seu-perfil"
                        className={`w-full pl-10 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ${
                          errors.linkedin ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                    </div>
                    {errors.linkedin && <p className="text-red-500 text-sm mt-1">{errors.linkedin.message}</p>}
                  </div>
                </div>
              </div>

              {/* Educação */}
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                  <FaGraduationCap className="mr-2 text-blue-600" /> Educação
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label htmlFor="educationLevel" className="block text-gray-700 font-medium mb-2">
                      Nível de Escolaridade
                    </label>
                    <select
                      id="educationLevel"
                      {...register('educationLevel')}
                      className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ${
                        errors.educationLevel ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Selecione</option>
                      <option value="high_school">Ensino Médio</option>
                      <option value="bachelor">Graduação</option>
                      <option value="master">Mestrado</option>
                      <option value="doctorate">Doutorado</option>
                    </select>
                    {errors.educationLevel && (
                      <p className="text-red-500 text-sm mt-1">{errors.educationLevel.message}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="course" className="block text-gray-700 font-medium mb-2">
                      Curso
                    </label>
                    <input
                      type="text"
                      id="course"
                      {...register('course')}
                      placeholder="Ex.: Ciência da Computação"
                      className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ${
                        errors.course ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.course && <p className="text-red-500 text-sm mt-1">{errors.course.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="institution" className="block text-gray-700 font-medium mb-2">
                      Instituição
                    </label>
                    <input
                      type="text"
                      id="institution"
                      {...register('institution')}
                      placeholder="Ex.: Universidade de São Paulo"
                      className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ${
                        errors.institution ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.institution && (
                      <p className="text-red-500 text-sm mt-1">{errors.institution.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Experiência Profissional */}
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                  <FaBuilding className="mr-2 text-blue-600" /> Experiência Profissional
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label htmlFor="lastCompany" className="block text-gray-700 font-medium mb-2">
                      Última Empresa
                    </label>
                    <div className="relative">
                      <FaBuilding className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        id="lastCompany"
                        {...register('lastCompany')}
                        placeholder="Ex.: Tech Corp"
                        className={`w-full pl-10 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ${
                          errors.lastCompany ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                    </div>
                    {errors.lastCompany && (
                      <p className="text-red-500 text-sm mt-1">{errors.lastCompany.message}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="lastPosition" className="block text-gray-700 font-medium mb-2">
                      Último Cargo
                    </label>
                    <input
                      type="text"
                      id="lastPosition"
                      {...register('lastPosition')}
                      placeholder="Ex.: Desenvolvedor Front-End"
                      className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ${
                        errors.lastPosition ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.lastPosition && (
                      <p className="text-red-500 text-sm mt-1">{errors.lastPosition.message}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="experiencePeriod" className="block text-gray-700 font-medium mb-2">
                      Período (ex.: 2020-2025)
                    </label>
                    <div className="relative">
                      <FaCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        id="experiencePeriod"
                        {...register('experiencePeriod')}
                        placeholder="Ex.: 2020-2025"
                        className={`w-full pl-10 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ${
                          errors.experiencePeriod ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                    </div>
                    {errors.experiencePeriod && (
                      <p className="text-red-500 text-sm mt-1">{errors.experiencePeriod.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Habilidades */}
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                  <FaCode className="mr-2 text-blue-600" /> Habilidades
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="technicalSkills" className="block text-gray-700 font-medium mb-2">
                      Habilidades Técnicas
                    </label>
                    <div className="relative">
                      <FaCode className="absolute left-3 top-5 text-gray-400" />
                      <textarea
                        id="technicalSkills"
                        {...register('technicalSkills')}
                        rows="3"
                        placeholder="Ex.: JavaScript, React, Tailwind CSS"
                        className={`w-full pl-10 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ${
                          errors.technicalSkills ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                    </div>
                    {errors.technicalSkills && (
                      <p className="text-red-500 text-sm mt-1">{errors.technicalSkills.message}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="softSkills" className="block text-gray-700 font-medium mb-2">
                      Habilidades Comportamentais
                    </label>
                    <div className="relative">
                      <FaPeopleArrows className="absolute left-3 top-5 text-gray-400" />
                      <textarea
                        id="softSkills"
                        {...register('softSkills')}
                        rows="3"
                        placeholder="Ex.: Comunicação, Trabalho em Equipe"
                        className={`w-full pl-10 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ${
                          errors.softSkills ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                    </div>
                    {errors.softSkills && (
                      <p className="text-red-500 text-sm mt-1">{errors.softSkills.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Outras Informações */}
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                  <FaMoneyBillWave className="mr-2 text-blue-600" /> Outras Informações
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="salaryExpectation" className="block text-gray-700 font-medium mb-2">
                      Pretensão Salarial (R$)
                    </label>
                    <div className="relative">
                      <FaMoneyBillWave className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="number"
                        id="salaryExpectation"
                        {...register('salaryExpectation')}
                        placeholder="Ex.: 5000"
                        className={`w-full pl-10 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ${
                          errors.salaryExpectation ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                    </div>
                    {errors.salaryExpectation && (
                      <p className="text-red-500 text-sm mt-1">{errors.salaryExpectation.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Idiomas
                    </label>
                    <div className="flex flex-wrap gap-4">
                      {['Português', 'Inglês', 'Espanhol', 'Francês', 'Alemão'].map((language) => (
                        <label key={language} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            value={language}
                            checked={languages.includes(language)}
                            onChange={() => handleLanguageChange(language)}
                            className="h-5 w-5 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <span>{language}</span>
                        </label>
                      ))}
                    </div>
                    {errors.languages && (
                      <p className="text-red-500 text-sm mt-1">{errors.languages.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Currículo */}
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                  <FaFileUpload className="mr-2 text-blue-600" /> Currículo
                </h3>
                <div className="mb-6">
                  <label htmlFor="resumeLink" className="block text-gray-700 font-medium mb-2">
                    Link do Currículo (ex.: Google Drive)
                  </label>
                  <div className="relative">
                    <FaFileUpload className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="url"
                      id="resumeLink"
                      {...register('resumeLink')}
                      placeholder="Ex.: https://drive.google.com/seu-curriculo"
                      className={`w-full pl-10 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ${
                        errors.resumeLink ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                  </div>
                  {errors.resumeLink && (
                    <p className="text-red-500 text-sm mt-1">{errors.resumeLink.message}</p>
                  )}
                </div>
              </div>

              {/* Termos */}
              <div className="mb-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    {...register('terms')}
                    className="mr-2 h-5 w-5 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-gray-700">
                    Aceito os{' '}
                    <a href="#" className="text-blue-500 hover:underline">
                      termos e condições
                    </a>
                  </span>
                </label>
                {errors.terms && <p className="text-red-500 text-sm mt-1">{errors.terms.message}</p>}
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300 flex items-center justify-center space-x-2"
              >
                <FaCheckCircle /> <span>Enviar Candidatura</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Seção de Candidaturas Salvas */}
      {submissions.length > 0 && (
        <section id="submissions" className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Candidaturas Recebidas
            </h3>
            <div className="flex justify-center space-x-4 mb-6">
              <button
                onClick={exportSubmissions}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200"
              >
                Exportar Candidaturas
              </button>
              <button
                onClick={clearSubmissions}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
              >
                Limpar Candidaturas
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {submissions.map((submission) => (
                <div
                  key={submission.id}
                  className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
                >
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">{submission.name}</h4>
                  <p className="text-gray-600">
                    <strong>E-mail:</strong> {submission.email}
                  </p>
                  <p className="text-gray-600">
                    <strong>Telefone:</strong> {submission.phone}
                  </p>
                  <p className="text-gray-600">
                    <strong>LinkedIn:</strong>{' '}
                    <a
                      href={submission.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {submission.linkedin}
                    </a>
                  </p>
                  <p className="text-gray-600">
                    <strong>Escolaridade:</strong>{' '}
                    {submission.educationLevel === 'high_school'
                      ? 'Ensino Médio'
                      : submission.educationLevel === 'bachelor'
                      ? 'Graduação'
                      : submission.educationLevel === 'master'
                      ? 'Mestrado'
                      : 'Doutorado'}
                  </p>
                  <p className="text-gray-600">
                    <strong>Curso:</strong> {submission.course}
                  </p>
                  <p className="text-gray-600">
                    <strong>Instituição:</strong> {submission.institution}
                  </p>
                  <p className="text-gray-600">
                    <strong>Última Empresa:</strong> {submission.lastCompany}
                  </p>
                  <p className="text-gray-600">
                    <strong>Cargo:</strong> {submission.lastPosition}
                  </p>
                  <p className="text-gray-600">
                    <strong>Período:</strong> {submission.experiencePeriod}
                  </p>
                  <p className="text-gray-600">
                    <strong>Habilidades Técnicas:</strong> {submission.technicalSkills}
                  </p>
                  <p className="text-gray-600">
                    <strong>Habilidades Comportamentais:</strong> {submission.softSkills}
                  </p>
                  <p className="text-gray-600">
                    <strong>Pretensão Salarial:</strong> R${submission.salaryExpectation}
                  </p>
                  <p className="text-gray-600">
                    <strong>Idiomas:</strong> {submission.languages.join(', ')}
                  </p>
                  <p className="text-gray-600">
                    <strong>Currículo:</strong>{' '}
                    <a
                      href={submission.resumeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {submission.resumeLink}
                    </a>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Rodapé */}
      <footer className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg">
            Desenvolvido por{' '}
            <a
              href="https://github.com/opswesley"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-200 hover:underline"
            >
              opswesley
            </a>
          </p>
          <p className="text-sm mt-2">© 2025 FormFloaat - Todos os direitos reservados</p>
        </div>
      </footer>
    </div>
  );
}

export default Form;