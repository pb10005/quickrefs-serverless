import { supabase } from './supabase';

// knowledges
export const getKnowledges = async () => {
    const { data, error } = await supabase
        .from('knowledges')
        .select()
    return {
        data: data.map(x => {
            return {
                id: x.id,
                name: x.name,
                description: x.description,
                isPrivate: x.is_private,
                createdAt: x.created_at,
                updatedAt: x.updated_at
            }
        }),
        error
    }
}

export const getKnowledgesByUserId = async (id) => {
    const { data, error } = await supabase
        .from('knowledges')
        .select()
        .match({ owner: id })
    return {
        data: data.map(x => {
            return {
                id: x.id,
                name: x.name,
                description: x.description,
                isPrivate: x.is_private,
                createdAt: x.created_at,
                updatedAt: x.updated_at
            }
        }),
        error
    }
}

export const getKnowledgesByTag = async (tagId) => {
    const { data, error } = await supabase
    .from('knowledge_tags')
    .select('knowledges(*)')
    .match({ tag_id: tagId })
    return {
        data: data.map(x => {
            return {
                id: x.knowledges.id,
                name: x.knowledges.name,
                description: x.description,
                isPrivate: x.knowledges.is_private,
                createdAt: x.knowledges.created_at,
                updatedAt: x.knowledges.updated_at
            }
        }),
        error
    }
}

export const getKnowledgeById = async (id) => {
    const { data, error } = await supabase
        .from('knowledges')
        .select()
        .eq("id", id)
    const knowledge = data[0]
    return {
        data: {
          id: knowledge.id,
          owner: knowledge.owner,
          name: knowledge.name,
          description: knowledge.description,
          isPrivate: knowledge.is_private,
          createdAt: knowledge.created_at,
          updatedAt: knowledge.updated_at
        },
        error
    }
}

export const insertKnowledge = async ({ owner, name, description, isPrivate }) => {
    const { data, error } = await supabase
        .from('knowledges')
        .insert({
            owner: owner,
            name: name,
            description: description,
            is_private: isPrivate
        })
    return {
        data: data[0],
        error
    }
}

export const updateKnowledge = async (id, { name, description, isPrivate }) => {
    const { data, error } = await supabase
        .from('knowledges')
        .update({
            name: name,
            description: description,
            is_private: isPrivate,
            updated_at: new Date()
        })
        .match({id: id})
    return {
        data: data[0],
        error
    }
}

// refs
export const getRefsByKnowledgeId = async (knowledgeId) => {
    const { data, error } = await supabase
        .from('refs')
        .select()
        .eq("knowledge_id", knowledgeId) 

    return {
        data: data.map(x => {
            return {
                id: x.id,
                name: x.name,
                description: x.description,
                knowledgeId: x.knowledge_id,
                createdAt: x.created_at,
                updatedAt: x.updated_at
            }
        }),
        error
    }
}

export const insertRef = async ({knowledgeId, name, description, url}) => {
    const { data, error } = await supabase
        .from('refs')
        .insert({
            knowledge_id: knowledgeId,
            name: name,
            description: description,
            url: url
        })
    return {
        data: data[0],
        error
    }    
}
export const updateRef = async (id, {knowledgeId, name, description, url}) => {
    const { data, error } = await supabase
        .from('refs')
        .update({
            knowledge_id: knowledgeId,
            name: name,
            description: description,
            url: url,
            updated_at: new Date()
        })
        .match({ id: id })
    return {
        data: data[0],
        error
    }    
}

export const deleteRef = async (id) => {
    const { data, error } = await supabase
        .from('refs')
        .delete()
        .match({ id: id })
    
    return {
        data,
        error
    }
}

// profiles
export const getProfileById = async (id) => {
    const { data, error } = await supabase
        .from('profiles')
        .select()
        .eq("id", id)
    const profile = data[0]
    return {
        data: {
          id: profile.id,
          name: profile.name,
          screenName: profile.screen_name,
          createdAt: profile.created_at,
          updatedAt: profile.updated_at
        },
        error
    }
} 

export const upsertProfile = async (id, { name, screenName }) => {
    const { data, error } = await supabase.from('profiles')
        .upsert({
            id: id,
            name: name,
            screen_name: screenName
        })
    return {
        data,
        error
    }
}

// tags
export const getTagByName = async (name) => {
    const { data, error } = await supabase.from('tags')
        .select()
        .match({ name: name })
    return data[0]
}

export const getTags = async () => {
    const { data, error } = await supabase.from('tags')
        .select()
    return {
        data,
        error
    }
}

export const insertTag = async (name) => {
    const { data, error } = await supabase.from('tags')
        .insert({
            name: name
        })
    return {
        data: data[0],
        error
    }
}


// knowledge tags
export const getKnowledgeTags = async (knowledgeId) => {
    const { data, error } = await supabase.from('knowledge_tags')
        .select('tags(id, name)')
        .match({ knowledge_id: knowledgeId })
    return {
        data: data.map(x => x.tags),
        error
    }
}

export const insertKnowledgeTag = async (knowledgeId, tagId) => {
    const { data, error } = await supabase.from('knowledge_tags')
        .insert({
            knowledge_id: knowledgeId,
            tag_id: tagId
        })
    return {
        data,
        error
    }
}

export const deleteKnowledgeTag = async (knowledgeId, tagId) => {
    const { data, error } = await supabase.from('knowledge_tags')
        .delete()
        .match({
            knowledge_id: knowledgeId,
            tag_id: tagId
        })
    return {
        data,
        error
    }
}